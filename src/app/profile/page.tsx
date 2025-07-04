"use client";

import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/passwordInput";
import FormPhoneInput from "@/components/ui/phoneInput";
import { useState, useCallback, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { useForm } from "@felte/react";
import { validator } from "@felte/validator-zod";
import { z } from "zod";
import { reporter } from "@felte/reporter-react";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import Joyride, { Step } from "react-joyride-react-19";
import imageCompression from "browser-image-compression";

// Define interfaces for better type safety and readability
interface ProfileData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
  positions: {
    id: number;
    name: string;
  }[];
}

export default function Profile() {
  // --- State Management ---

  // Avatar states
  const [imageValid, setImageValid] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(
    null
  );
  const [originalAvatarPreview, setOriginalAvatarPreview] = useState<
    string | null
  >(null);
  const [originalSelectedAvatarFile, setOriginalSelectedAvatarFile] =
    useState<File | null>(null);

  // Profile and Company data states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState<string | undefined>(undefined);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: "",
    phoneNumber: "",
    email: "",
  });
  const [companyName, setCompanyName] = useState("");
  const [maxAnnualLeave, setMaxAnnualLeave] = useState("");
  const [maxWeeklyOvertime, setMaxWeeklyOvertime] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentsInUse, setDepartmentsInUse] = useState<number[]>([]);
  const [positionsInUse, setPositionsInUse] = useState<
    { deptId: number; positionName: string }[]
  >([]);

  const [showInUseAlertDialog, setShowInUseAlertDialog] = useState(false);
  const [inUseMessage, setInUseMessage] = useState("");

  // useEffect(() => {
  //   // --- SIMULASI DATA YANG SEDANG DIGUNAKAN ---
  //   // Misalnya, anggap departemen dengan ID 1 tidak bisa dihapus
  //   setDepartmentsInUse([2]);

  //   // Anggap posisi "Software Engineer" di departemen ID 2 tidak bisa dihapus
  //   setPositionsInUse([
  //     // { deptId: 1, positionName: "Software Engineer" },
  //     { deptId: 2, positionName: "Manager" },
  //     { deptId: 2, positionName: "Frontend Engineer" },
  //     // Anda bisa menambahkan simulasi lain di sini
  //   ]);
  // }, []); // [] agar hanya berjalan sekali saat komponen di-mount

  // Original data for cancelling edits
  const [originalProfileData, setOriginalProfileData] =
    useState<ProfileData>(profileData);
  const [originalCompanyName, setOriginalCompanyName] =
    useState<string>(companyName);
  const [originalMaxAnnualLeave, setOriginalMaxAnnualLeave] =
    useState<string>(maxAnnualLeave);
  const [originalMaxWeeklyOvertime, setOriginalMaxWeeklyOvertime] =
    useState<string>(maxWeeklyOvertime);
  const [originalDepartments, setOriginalDepartments] =
    useState<Department[]>(departments);

  // UI State: Editing modes
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isCompanyEditing, setIsCompanyEditing] = useState(false);

  // UI State: Forms visibility for Departments and Positions
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [showEditDepartmentForm, setShowEditDepartmentForm] = useState<{
    [key: number]: boolean;
  }>({});
  const [editDepartmentName, setEditDepartmentName] = useState<{
    [key: number]: string;
  }>({});

  const [showAddPositionForm, setShowAddPositionForm] = useState<{
    [key: number]: boolean;
  }>({});
  const [newPositionName, setNewPositionName] = useState<{
    [key: number]: string;
  }>({});
  const [showEditPositionForm, setShowEditPositionForm] = useState<{
    [key: number]: { [key: number]: boolean };
  }>({});
  const [editPositionName, setEditPositionName] = useState<{
    [key: number]: { [key: number]: string };
  }>({});

  // UI State: Dropdown and Dialogs
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  const [openDepartmentDropdownId, setOpenDepartmentDropdownId] = useState<
    number | null
  >(null);
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  const [
    showDeleteDepartmentConfirmDialog,
    setShowDeleteDepartmentConfirmDialog,
  ] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<{
    id: number | null;
    name: string;
  }>({ id: null, name: "" });
  const [showDeletePositionConfirmDialog, setShowDeletePositionConfirmDialog] =
    useState(false);
  const [positionToDeleteInfo, setPositionToDeleteInfo] = useState<{
    deptId: number;
    positionId: number;
    positionName: string;
  } | null>(null);

  // Add these new state variables alongside your other UI state variables
  const [showEditDepartmentInUseDialog, setShowEditDepartmentInUseDialog] =
    useState(false);
  const [showEditPositionInUseDialog, setShowEditPositionInUseDialog] =
    useState(false);
  const [departmentToEditInfo, setDepartmentToEditInfo] = useState<{
    id: number | null;
    oldName: string;
    newName: string;
  } | null>(null);
  const [positionToEditInfo, setPositionToEditInfo] = useState<{
    deptId: number;
    positionId: number;
    oldName: string;
    newName: string;
  } | null>(null);

  // --- Handlers ---

  // Avatar Handlers
  const handleAvatarChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setSelectedAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
        setImageValid(true);
      } else {
        setSelectedAvatarFile(null);
        setAvatarPreview(null);
      }
    },
    []
  );

  // Profile Edit Handlers
  const handleEditProfileClick = useCallback(() => {
    if (!isProfileEditing) {
      setOriginalProfileData(profileData);
      setOriginalAvatarPreview(avatarPreview);
      setOriginalSelectedAvatarFile(selectedAvatarFile);
      setIsProfileEditing(true);
    }
  }, [isProfileEditing, profileData, avatarPreview, selectedAvatarFile]);

  const handleCancelProfileEdit = useCallback(() => {
    setProfileData(originalProfileData);
    setAvatarPreview(originalAvatarPreview);
    setSelectedAvatarFile(originalSelectedAvatarFile);
    setIsProfileEditing(false);
  }, [originalProfileData, originalAvatarPreview, originalSelectedAvatarFile]);

  const handleSaveProfileEdit = useCallback(() => {
    console.log("Saving profile data:", profileData);
    // Add logic here to upload selectedAvatarFile to server
    setIsProfileEditing(false);
    setOriginalProfileData(profileData);
    // Optionally reset original avatar states if not needed after saving
    // setOriginalAvatarPreview(null);
    // setOriginalSelectedAvatarFile(null);
  }, [profileData]);

  // Company Edit Handlers
  const handleEditCompanyClick = useCallback(() => {
    if (!isCompanyEditing) {
      setOriginalCompanyName(companyName);
      setOriginalMaxAnnualLeave(maxAnnualLeave);
      setOriginalMaxWeeklyOvertime(maxWeeklyOvertime);
      setOriginalDepartments(departments);
      setIsCompanyEditing(true);
    }
  }, [isCompanyEditing, companyName, originalMaxAnnualLeave, originalMaxWeeklyOvertime, departments]);

  const handleCancelCompanyEdit = useCallback(() => {
    setCompanyName(originalCompanyName);
    setMaxAnnualLeave(originalMaxAnnualLeave);
    setMaxWeeklyOvertime(originalMaxWeeklyOvertime)
    // setDepartments(originalDepartments);
    setShowAddDepartmentForm(false);
    // setNewDepartmentName("");
    // setShowAddPositionForm({});
    // setNewPositionName({});
    // setShowEditDepartmentForm({});
    // setEditDepartmentName({});
    // setShowEditPositionForm({});
    // setEditPositionName({});
    setIsCompanyEditing(false);
  }, [originalCompanyName, originalMaxAnnualLeave, originalMaxWeeklyOvertime]);

  const handleSaveCompanyEdit = useCallback(() => {
    console.log("Saving company name:", companyName);
    console.log("Saving departments and positions:", departments);
    setIsCompanyEditing(false);
    setShowAddDepartmentForm(false);
    setNewDepartmentName("");
    setShowAddPositionForm({});
    setNewPositionName({});
    setShowEditDepartmentForm({});
    setEditDepartmentName({});
    setShowEditPositionForm({});
    setEditPositionName({});
    setOriginalCompanyName(companyName);
    setOriginalMaxAnnualLeave(maxAnnualLeave);
    setOriginalMaxWeeklyOvertime(maxWeeklyOvertime);
    setOriginalDepartments(departments);
  }, [companyName, maxAnnualLeave, maxWeeklyOvertime, departments]);

  // Department Handlers
  const handleAddDepartmentClick = useCallback(() => {
    setShowAddDepartmentForm(true);
  }, []);

  const handleAddDepartmentSubmit = useCallback(
    (deptId: number) => {
      if (newDepartmentName.trim() !== "") {
        const newId = deptId;
        // departments.length > 0
        //   ? Math.max(...departments.map((d) => d.id)) + 1
        //   : 1;
        const newDept = {
          id: newId,
          name: newDepartmentName.trim(),
          positions: [],
        };
        setDepartments((prev) => [...prev, newDept]);
        setNewDepartmentName("");
        setShowAddDepartmentForm(false);
      }
    },
    [newDepartmentName, departments]
  );

  const handleEditDepartment = useCallback(
    (deptId: number) => {
      const departmentToEdit = departments.find((dept) => dept.id === deptId);
      if (departmentToEdit) {
        setEditDepartmentName((prev) => ({
          ...prev,
          [deptId]: departmentToEdit.name,
        }));
        setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: true }));
        // Close other forms when opening department edit form
        setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false }));
        setShowEditPositionForm((prev) => ({ ...prev, [deptId]: {} }));
        setOpenDepartmentDropdownId(null);
      }
    },
    [departments]
  );

  const handleSaveEditDepartment = useCallback(
    (deptId: number) => {
      const newName = editDepartmentName[deptId]?.trim();
      const departmentToEdit = departments.find((dept) => dept.id === deptId);
      const oldName = departmentToEdit ? departmentToEdit.name : "";

      // Tambahkan kondisi ini: Jika nama baru sama dengan nama lama, langsung batalkan edit
      if (newName === oldName) {
        setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
        setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" }));
        return; // Keluar dari fungsi
      }

      if (newName && newName !== "") {
        // ... (logika yang sudah ada)

        // Check if the department (or any of its positions) is in use
        const isDepartmentDirectlyInUse = departmentsInUse.includes(deptId);
        const areAnyPositionsInUse = positionsInUse.some(
          (pos) => pos.deptId === deptId
        );

        if (isDepartmentDirectlyInUse || areAnyPositionsInUse) {
          setDepartmentToEditInfo({ id: deptId, oldName, newName });
          setShowEditDepartmentInUseDialog(true); // Show the new confirmation dialog
        } else {
          // If not in use, proceed with saving directly
          setDepartments((prev) =>
            prev.map((dept) =>
              dept.id === deptId ? { ...dept, name: newName } : dept
            )
          );
          setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
          setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" }));
        }
      }
    },
    [editDepartmentName, departments, departmentsInUse, positionsInUse]
  );

  const confirmSaveEditDepartment = useCallback(() => {
    if (departmentToEditInfo && departmentToEditInfo.id !== null) {
      const { id: deptId, newName } = departmentToEditInfo;
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === deptId ? { ...dept, name: newName } : dept
        )
      );
      // You might want to update positionsInUse to reflect the new department name if it's part of the position name
      // For example, if position names were like "Marketing - Software Engineer"

      setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
      setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" }));
    }
    setDepartmentToEditInfo(null);
    setShowEditDepartmentInUseDialog(false);
  }, [departmentToEditInfo]);

  const handleCancelEditDepartment = useCallback((deptId: number) => {
    setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
    setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" }));
  }, []);

  const openDeleteDepartmentDialog = useCallback((id: number, name: string) => {
    setDepartmentToDelete({ id, name });
    setShowDeleteDepartmentConfirmDialog(true);
    setOpenDepartmentDropdownId(null); // Close the dropdown when the alert dialog opens
  }, []);

  const confirmDeleteDepartment = useCallback(() => {
    setDepartments((prev) =>
      prev.filter((d) => d.id !== departmentToDelete.id)
    );
    setDepartmentToDelete({ id: null, name: "" }); // Reset after deletion
    setShowDeleteDepartmentConfirmDialog(false);
  }, [departmentToDelete.id]);

  // Position Handlers
  const handleAddPositionClick = useCallback((deptId: number) => {
    setShowAddPositionForm((prev) => ({ ...prev, [deptId]: true }));
    setNewPositionName((prev) => ({ ...prev, [deptId]: "" }));
    setOpenDepartmentDropdownId(null);
    // Close other forms when opening position add form
    setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
    setShowEditPositionForm((prev) => ({ ...prev, [deptId]: {} }));
  }, []);

  const handleAddPositionSubmit = useCallback(
    (deptId: number, positionId: number) => {
      const positionName = newPositionName[deptId]?.trim();
      if (positionName && positionName !== "") {
        setDepartments((prev) =>
          prev.map((dept) =>
            dept.id === deptId
              ? {
                  ...dept,
                  positions: [
                    ...dept.positions,
                    {
                      id: positionId, // temp ID sebelum dapat dari backend
                      name: positionName,
                    },
                  ],
                }
              : dept
          )
        );
        setNewPositionName((prev) => ({ ...prev, [deptId]: "" }));
        setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false }));
      }
    },
    [newPositionName]
  );

  const handleEditPosition = useCallback(
    (deptId: number, positionId: number) => {
      const department = departments.find((dept) => dept.id === deptId);
      const position = department?.positions.find(
        (pos) => pos.id === positionId
      );

      if (department && position) {
        setEditPositionName((prev) => ({
          ...prev,
          [deptId]: {
            ...prev[deptId],
            [positionId]: position.name,
          },
        }));

        setShowEditPositionForm((prev) => ({
          ...prev,
          [deptId]: {
            ...prev[deptId],
            [positionId]: true,
          },
        }));

        // Close other forms when opening position edit form
        setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false }));
        setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
      }
    },
    [departments]
  );

  const handleSaveEditPosition = useCallback(
    (deptId: number, positionId: number) => {
      const newPositionNameTrimmed =
        editPositionName[deptId]?.[positionId]?.trim();
      const department = departments.find((dept) => dept.id === deptId);
      const oldPosition = department?.positions.find(
        (pos) => pos.id === positionId
      );

      if (!department || !oldPosition || !newPositionNameTrimmed) return;

      // Jika tidak ada perubahan nama, batalkan edit
      if (newPositionNameTrimmed === oldPosition.name) {
        setShowEditPositionForm((prev) => ({
          ...prev,
          [deptId]: { ...prev[deptId], [positionId]: false },
        }));
        setEditPositionName((prev) => ({
          ...prev,
          [deptId]: { ...prev[deptId], [positionId]: "" },
        }));
        return;
      }

      // Cek apakah posisi sedang digunakan
      const isPositionCurrentlyInUse = positionsInUse.some(
        (info) =>
          info.deptId === deptId && info.positionName === oldPosition.name
      );

      if (isPositionCurrentlyInUse) {
        setPositionToEditInfo({
          deptId,
          positionId,
          oldName: oldPosition.name,
          newName: newPositionNameTrimmed,
        });
        setShowEditPositionInUseDialog(true);
      } else {
        // Update langsung
        setDepartments((prev) =>
          prev.map((dept) =>
            dept.id === deptId
              ? {
                  ...dept,
                  positions: dept.positions.map((pos) =>
                    pos.id === positionId
                      ? { ...pos, name: newPositionNameTrimmed }
                      : pos
                  ),
                }
              : dept
          )
        );

        setShowEditPositionForm((prev) => ({
          ...prev,
          [deptId]: { ...prev[deptId], [positionId]: false },
        }));
        setEditPositionName((prev) => ({
          ...prev,
          [deptId]: { ...prev[deptId], [positionId]: "" },
        }));
      }
    },
    [editPositionName, departments, positionsInUse]
  );

  const handleCancelEditPosition = useCallback(
    (deptId: number, positionId: number) => {
      setShowEditPositionForm((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionId]: false },
      }));
      setEditPositionName((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionId]: "" },
      }));
    },
    []
  );

  const confirmSaveEditPosition = useCallback(() => {
    if (positionToEditInfo) {
      const { deptId, positionId, newName } = positionToEditInfo;
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === deptId
            ? {
                ...dept,
                positions: dept.positions.map((pos, idx) =>
                  idx === positionId ? { ...pos, name: newName } : pos
                ),
              }
            : dept
        )
      );
      // In a real application, you'd also send an API call here
      // to update all employees whose position was `positionToEditInfo.oldName`
      // in `positionToEditInfo.deptId` to `positionToEditInfo.newName`.

      setShowEditPositionForm((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionId]: false },
      }));
      setEditPositionName((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionId]: "" },
      }));
    }
    setPositionToEditInfo(null);
    setShowEditPositionInUseDialog(false);
  }, [positionToEditInfo]);

  const openDeletePositionDialog = useCallback(
    (deptId: number, positionId: number, positionName: string) => {
      setPositionToDeleteInfo({ deptId, positionId, positionName });
      setShowDeletePositionConfirmDialog(true);
      setOpenDepartmentDropdownId(null);
    },
    []
  );

  const confirmDeletePosition = useCallback(() => {
    if (positionToDeleteInfo) {
      const { deptId, positionId } = positionToDeleteInfo;
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === deptId
            ? {
                ...dept,
                positions: dept.positions.filter(
                  (position) => position.id !== positionId
                ),
              }
            : dept
        )
      );
      setPositionToDeleteInfo(null);
      setShowDeletePositionConfirmDialog(false);
    }
  }, [positionToDeleteInfo]);

  // Password Change Handlers
  const handleOpenChangePasswordDialog = useCallback(() => {
    setIsHeaderDropdownOpen(false);
    setShowChangePasswordDialog(true);
  }, []);

  const handleChangePasswordSubmit = useCallback(() => {
    // Implement password change logic here (e.g., API call)
    console.log("Password changed!");
    setShowChangePasswordDialog(false);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resProfile = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const dataProfile = await resProfile.json();
        if (!resProfile.ok) {
          throw dataProfile;
        }
        setCompanyName(dataProfile.company_name);
        setCompanyId(dataProfile.company_id);
        setMaxAnnualLeave(dataProfile.max_annual_leave);
        setMaxWeeklyOvertime(dataProfile.max_weekly_overtime);
        setProfileData({
          fullName: dataProfile.full_name,
          phoneNumber: dataProfile.phone,
          email: dataProfile.email,
        });
        setAvatarPreview(dataProfile.photo_url);

        const resDepPos = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/getCompanyDepPos`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        const dataDepPos = await resDepPos.json();
        if (!resDepPos.ok) {
          throw dataDepPos;
        }

        // Transform the flat array into Department[]
        const departmentMap = new Map<number, Department>();

        dataDepPos.forEach((item: any) => {
          const deptId = item.id_department;
          const deptName = item.Department;
          const position = {
            id: item.id_position,
            name: item.Position,
          };

          if (!departmentMap.has(deptId)) {
            departmentMap.set(deptId, {
              id: deptId,
              name: deptName,
              positions: [position],
            });
          } else {
            // Prevent duplicate positions
            const dept = departmentMap.get(deptId)!;
            const exists = dept.positions.some((pos) => pos.id === position.id);
            if (!exists) {
              dept.positions.push(position);
            }
          }
        });

        const transformedDepartments = Array.from(departmentMap.values());
        setDepartments(transformedDepartments);

        setLoading(false);
      } catch (err: any) {
        let message = "Unknown error occurred";
        let messagesToShow: string[] = [];

        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as any).message === "string"
        ) {
          const backendError = err as {
            message: string;
            errors?: Record<string, string[]>;
          };

          if (backendError.message.toLowerCase().includes("failed to fetch")) {
            message = "Unknown error occurred";
          } else {
            message = backendError.message;
          }

          messagesToShow = backendError.errors
            ? Object.values(backendError.errors).flat()
            : [message];
        } else {
          messagesToShow = [message];
        }

        toast.error(
          <>
            <p className="text-red-700 font-bold">Error</p>
            {messagesToShow.map((msg, idx) => (
              <div key={idx} className="text-red-700">
                • {msg}
              </div>
            ))}
          </>,
          { duration: 30000 }
        );
      } finally {
        setIsLoading(false);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const changePassword = async () => {
    setLoading(true);
    // setError(false);
    // setSuccess(false);
    const form = document.getElementById("passwordForm") as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/change-password?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      toast.success("Company updated successfully");
      handleSaveCompanyEdit();
      // setSuccess(true);
    } catch (err) {
      // setError(true);
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const MAX_FILE_SIZE = 100 * 1024;
  const editProfile = async () => {
    setLoading(true);

    try {
      const formData = new FormData();

      let avatarToUpload = selectedAvatarFile;
      if (selectedAvatarFile && selectedAvatarFile.size > MAX_FILE_SIZE) {
        try {
          const options = {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 224,
            useWebWorker: true,
            fileType: 'image/jpeg',
            initialQuality: 0.6,
          };

          const compressedFile = await imageCompression(selectedAvatarFile, options);
          avatarToUpload = compressedFile;
        } catch (compressErr) {
          console.error("Gagal kompres gambar:", compressErr);
        }
      }
      if (avatarToUpload) {
        formData.append("user_photo", avatarToUpload);
      }

      formData.append("fullName", profileData.fullName);
      formData.append("email", profileData.email);
      formData.append("phone", phone ?? profileData.phoneNumber);
      // formData.append("photo", )
      console.log("FormData yang akan dikirim:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      if (!response.ok) {
        throw responseData;
      }
      toast.success("Profile updated successfully");
      handleSaveProfileEdit();
      window.location.reload();
      // setSuccess(true);
      // setLoading(false)
    } catch (err) {
      // setError(true);
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };
  const editCompany = async () => {
    setLoading(true);
    // setError(false);
    // setSuccess(false);

    try {
      console.log(companyName);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/company?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company_name: companyName,
            max_annual_leave: maxAnnualLeave,
            max_weekly_overtime: maxWeeklyOvertime
          }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        throw responseData;
      }
      toast.success("Company updated successfully");
      handleSaveCompanyEdit();
      // setSuccess(true);
    } catch (err) {
      // setError(true);
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const AddDepartment = async () => {
    setLoading(true);
    console.log("Departemnet", newDepartmentName);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/department`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_name: newDepartmentName,
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Department created successfully");
      handleAddDepartmentSubmit(dataDepPos.department_id);
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };
  const EditDepartment = async (deptid: number) => {
    setLoading(true);
    console.log("Departemnet_id", deptid);
    console.log("Departemnet", editDepartmentName[deptid]);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/department?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: deptid,
            department_name: editDepartmentName[deptid],
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Department edited successfully");
      handleSaveEditDepartment(deptid);
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };
  const DeleteDepartment = async () => {
    setLoading(true);
    console.log("Departemnet_id", departmentToDelete.id);
    console.log("Departemnet", departmentToDelete.name);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/department?_method=DELETE`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_id: departmentToDelete.id,
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Department deleted successfully");
      confirmDeleteDepartment();
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const AddPosition = async (deptid: number) => {
    setLoading(true);
    console.log("Department", deptid);
    console.log("Position", newPositionName);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/position`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_id: deptid,
            position_name: newPositionName[deptid],
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Position created successfully");
      handleAddPositionSubmit(deptid, dataDepPos.position_id);
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const EditPosition = async (deptid: number, posid: number) => {
    setLoading(true);
    console.log("Department", deptid);
    console.log("id posisi", posid);
    console.log("Position", editPositionName);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/position?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department_id: deptid,
            position_id: posid,
            position_name: editPositionName[deptid][posid],
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Position edited successfully");
      // setShowEditPositionForm()
      // setShowEditPositionForm((prev) => ({
      //   ...prev,
      //   [deptid]: { ...prev[deptid], [posid]: false },
      // }));

      handleSaveEditPosition(deptid, posid);
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const DeletePosition = async () => {
    setLoading(true);
    console.log("Position_id", positionToDeleteInfo?.positionId);
    console.log("Position", positionToDeleteInfo?.positionName);
    try {
      const resDepPos = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/position?_method=DELETE`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            position_id: positionToDeleteInfo?.positionId,
          }),
        }
      );

      const dataDepPos = await resDepPos.json();
      if (!resDepPos.ok) {
        throw dataDepPos;
      }

      toast.success("Position deleted successfully");
      confirmDeletePosition();
    } catch (err) {
      let message = "Unknown error occurred";
      let messagesToShow: string[] = [];

      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as any).message === "string"
      ) {
        const backendError = err as {
          message: string;
          errors?: Record<string, string[]>;
        };

        if (backendError.message.toLowerCase().includes("failed to fetch")) {
          message = "Unknown error occurred";
        } else {
          message = backendError.message;
        }

        messagesToShow = backendError.errors
          ? Object.values(backendError.errors).flat()
          : [message];
      } else {
        messagesToShow = [message];
      }

      toast.error(
        <>
          <p className="text-red-700 font-bold">Error</p>
          {messagesToShow.map((msg, idx) => (
            <div key={idx} className="text-red-700">
              • {msg}
            </div>
          ))}
        </>,
        { duration: 30000 }
      );
    } finally {
      setLoading(false);
    }
  };

  const [steps, setSteps] = useState<Step[]>([]);
  const [joyrideKey, setJoyrideKey] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const profileHRSteps = {
    profile: [
      {
        target: "#profile-user",
        content:
          "This is your profile page. Here you can view and edit your profile information and company information.",
        disableBeacon: true,
        placement: "bottom" as const,
      },
      {
        target: "#add-dep-position",
        content:
          "Click icon pencil or 'Add one now!' to add a new department or position in your company. You can also edit or delete existing departments and positions.",
        disableBeacon: true,
        placement: "bottom" as const,
      },
    ],
  };

  function checkJoyride(key: string) {
    const hasRun = localStorage.getItem(`joyride_shown_${key}`);
    if (!hasRun) {
      localStorage.setItem(`joyride_shown_${key}`, "true");
      return true;
    }
    return false;
  }

  useEffect(() => {
    if (!loading) {
      const checkclockEl = document.querySelector("#profile-user");
      if (checkclockEl && checkJoyride("profile")) {
        setSteps(profileHRSteps["profile"]);
        setJoyrideKey((prev) => prev + 1);
      }
    }
  }, [loading]);

  return (
    <>
    {hasMounted && (

      <Joyride
        key={joyrideKey} // Force re-render when key changes
        steps={steps}
        continuous={true}
        disableScrolling
        styles={{
          options: {
            arrowColor: "#fff",
            backgroundColor: "#fff",
            primaryColor: "#1E3A5F",
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: "12px",
            padding: "16px",
            fontSize: "16px",
            boxShadow: "0 4px 5px rgba(0,0,0,0.2)",
            height: "fit-content",
          },

          buttonBack: {
            marginRight: 5,
            color: "#1E3A5F",
            border: "1px solid #1E3A5F",
            backgroundColor: "#fff",
            borderRadius: "5px",
          },
          buttonClose: {
            display: "none",
          },
        }}
        showProgress={true}
        showSkipButton
      />
    )}
      <Sidebar title="Profile">
        <Toaster
          position="bottom-right"
          expand={true}
          richColors
          closeButton
        ></Toaster>
        <div className="">
          {isLoading ? (
            <Skeleton className="min-h-svh"></Skeleton>
          ) : (
            <Card
              className="w-full h-fit px-5 py-7 gap-[15px]"
              id="profile-user"
            >
              <div className="flex flex-row justify-between">
                <span className="px-[10px] text-lg">Profile</span>

                {/* Header Profile Dropdown */}
                <DropdownMenu
                  open={isHeaderDropdownOpen}
                  onOpenChange={setIsHeaderDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-fit h-fit"
                      icon={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    ></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-fit h-fit">
                    <DropdownMenuItem
                      className="w-full h-fit cursor-pointer"
                      onSelect={(e) => {
                        e.preventDefault();
                        handleOpenChangePasswordDialog();
                      }}
                    >
                      Change password
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Change Password Dialog */}
                <Dialog
                  open={showChangePasswordDialog}
                  onOpenChange={setShowChangePasswordDialog}
                >
                  <DialogContent
                    className="sm:max-w-[425px] min-w-[500px] bg-white"
                    showCloseButton={false}
                  >
                    <AlertDialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                    </AlertDialogHeader>
                    <form id="passwordForm">
                      <div className="grid gap-4 mt-3">
                        <PasswordInput
                          label="Old Password"
                          name="old_password"
                          id="old_password"
                          placeholder="Enter your old password"
                        />
                        <PasswordInput
                          label="New Password"
                          name="new_password"
                          id="new_password"
                          placeholder="Enter your new password"
                        />
                        <PasswordInput
                          label="Confirm New Password"
                          name="new_password_confirmation"
                          id="new_password_confirmation"
                          placeholder="Enter your new password"
                        />
                      </div>
                      <DialogFooter>
                        <div className="flex w-full">
                          {/* <Button variant={"link"} className="w-fit flex-1 justify-start items-center p-0"> */}
                          <a
                            className="flex cursor-pointer text-info-500 underline-offset-4 hover:underline items-center text-sm"
                            href="sign-in/forgot-password"
                          >
                            Forgot Password?
                          </a>
                          {/* </Button> */}
                          {/* <div className="w-full"></div> */}

                          <div className="flex flex-1 flex-row gap-3.5 justify-end mt-4">
                            <DialogClose asChild>
                              <Button
                                variant={"outline"}
                                className="w-fit"
                                disabled={loading}
                              >
                                Cancel
                              </Button>
                            </DialogClose>
                            <Button
                              disabled={loading}
                              variant={"default"}
                              className="w-fit h-fit"
                              // onClick={handleChangePasswordSubmit}
                              onClick={changePassword}
                            >
                              {!loading ? (
                                <>
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M17 21V13H7V21"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7 3V8H15"
                                      stroke="white"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  <span className="ml-1">Save</span>
                                </>
                              ) : (
                                <Spinner size="small" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Profile Information Card */}
              {/* <form ref={form} method="post"> */}

              <Card className="p-5 mt-1">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Profile Information</span>
                  {!isProfileEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-fit w-fit p-1"
                      onClick={handleEditProfileClick}
                      icon={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 20H21"
                            stroke="black"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z"
                            stroke="black"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    ></Button>
                  )}
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row items-center gap-5">
                    <div>
                      {avatarPreview && imageValid ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar Preview"
                          className="w-[78px] h-[78px] rounded-full object-cover border border-gray-300"
                          onError={() => setImageValid(false)}
                        />
                      ) : (
                        <svg
                          width="78"
                          height="78"
                          viewBox="0 0 78 78"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="78" height="78" rx="39" fill="#F3F4F6" />
                          <mask
                            id="mask0_462_2363"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="16"
                            width="78"
                            height="62"
                            style={{ maskType: "alpha" }}
                          >
                            <path
                              d="M78 68.2272V78H0V68.263C4.53684 62.1999 10.4257 57.2791 17.1983 53.8916C23.9709 50.5042 31.4405 48.7436 39.013 48.75C54.951 48.75 69.108 56.4005 78 68.2272V68.2272ZM52.0065 29.2467C52.0065 32.6945 50.6369 36.0011 48.1989 38.4391C45.7609 40.8771 42.4543 42.2467 39.0065 42.2467C35.5587 42.2467 32.2521 40.8771 29.8141 38.4391C27.3761 36.0011 26.0065 32.6945 26.0065 29.2467C26.0065 25.7989 27.3761 22.4923 29.8141 20.0543C32.2521 17.6163 35.5587 16.2467 39.0065 16.2467C42.4543 16.2467 45.7609 17.6163 48.1989 20.0543C50.6369 22.4923 52.0065 25.7989 52.0065 29.2467V29.2467Z"
                              fill="black"
                            />
                          </mask>
                          <g mask="url(#mask0_462_2363)">
                            <rect
                              width="78"
                              height="78"
                              rx="39"
                              fill="#D1D5DB"
                            />
                          </g>
                        </svg>
                      )}
                    </div>
                    {isProfileEditing && (
                      <div>
                        <input
                          type="file"
                          name="user_photo"
                          accept="image/*"
                          id="user_photo"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                        <Button variant="default">
                          <label
                            htmlFor="user_photo"
                            className="cursor-pointer"
                          >
                            Edit Avatar
                          </label>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="Enter full name"
                      value={profileData.fullName || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          fullName: e.target.value,
                        })
                      }
                      disabled={!isProfileEditing}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-1 flex-col gap-[8px]">
                    {isProfileEditing ? (
                      <>
                        <FormPhoneInput
                          placeholder="Enter employee phone number"
                          value={profileData.phoneNumber}
                          onValueChange={(value) => {
                            setPhone(value);
                          }}
                        />
                        <input
                          type="hidden"
                          name="phone"
                          value={profileData.phoneNumber ?? ""}
                        />
                      </>
                    ) : (
                      <>
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="N/A"
                          value={profileData.phoneNumber || ""}
                          disabled
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-[8px]">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={profileData.email || ""}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          email: e.target.value,
                        })
                      }
                      disabled={!isProfileEditing}
                    />
                  </div>
                </div>
                {isProfileEditing && (
                  <div className="flex flex-row gap-3.5 justify-end mt-4">
                    <Button
                      disabled={loading}
                      variant={"outline"}
                      className="w-fit"
                      onClick={handleCancelProfileEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant={"default"}
                      className="w-fit"
                      onClick={editProfile}
                      disabled={loading}
                    >
                      {!loading ? (
                        <>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 21V13H7V21"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 3V8H15"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="ml-1">Save</span>
                        </>
                      ) : (
                        <Spinner size="small" />
                      )}
                    </Button>
                  </div>
                )}
              </Card>
              {/* </form> */}

              {/* Company Information Card */}
              <Card className="p-5 mt-5" id="add-dep-position">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-lg">Company Information</span>
                  {!isCompanyEditing && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="p-1 h-auto w-auto"
                      onClick={handleEditCompanyClick}
                      icon={
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 20H21"
                            stroke="black"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 3.49998C16.8978 3.10216 17.4374 2.87866 18 2.87866C18.2786 2.87866 18.5544 2.93353 18.8118 3.04014C19.0692 3.14674 19.303 3.303 19.5 3.49998C19.697 3.69697 19.8532 3.93082 19.9598 4.18819C20.0665 4.44556 20.1213 4.72141 20.1213 4.99998C20.1213 5.27856 20.0665 5.55441 19.9598 5.81178C19.8532 6.06915 19.697 6.303 19.5 6.49998L7 19L3 20L4 16L16.5 3.49998Z"
                            stroke="black"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      }
                    ></Button>
                  )}
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="company_name">Company ID</Label>
                    <Input
                      value={companyId}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      type="text"
                      id="company_name"
                      name="company_name"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      disabled={!isCompanyEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="max_annual_leave">Max Annual Leave (Day)</Label>
                    <Input
                      type="text"
                      id="max_annual_leave"
                      name="max_annual_leave"
                      placeholder="Enter max annual leave"
                      value={maxAnnualLeave}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]+$/.test(value)) {
                          setMaxAnnualLeave(value);
                        }
                      }}
                      disabled={!isCompanyEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="max_weekly_overtime">Max weekly overtime (Hour)</Label>
                    <Input
                      type="text"
                      id="max_weekly_overtime"
                      name="max_weekly_overtime"
                      placeholder="Enter max weekly overtime"
                      value={maxWeeklyOvertime}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^[0-9]+$/.test(value)) {
                          setMaxWeeklyOvertime(value);
                        }
                      }}
                      disabled={!isCompanyEditing}
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <Label htmlFor="add_department">
                      Departments & Positions
                    </Label>

                    {isCompanyEditing && !showAddDepartmentForm && (
                      <Button
                        variant="default"
                        className="h-fit w-fit"
                        onClick={handleAddDepartmentClick}
                      >
                        Add Department +
                      </Button>
                    )}

                    {isCompanyEditing && showAddDepartmentForm && (
                      <div className="flex flex-row gap-2">
                        <Input
                          type="text"
                          id="add_department"
                          name="add_department"
                          placeholder="Enter department name"
                          value={newDepartmentName}
                          onChange={(e) => setNewDepartmentName(e.target.value)}
                        />
                        <Button
                          variant="default"
                          className="h-fit w-fit"
                          onClick={AddDepartment}
                          disabled={loading}
                        >
                          {!loading ? (
                            <span>Add +</span>
                          ) : (
                            <Spinner size="small" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>

                  {departments.length === 0 ? (
                    <div className="px-5 py-3">
                      <p className="text-gray-500 italic">
                        Departments is empty. Please{" "}
                        {!isCompanyEditing ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEditCompanyClick();
                              setShowAddDepartmentForm(true);
                            }}
                            className="text-blue-600 underline"
                          >
                            add one now!
                          </a>
                        ) : (
                          "add a new department!"
                        )}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
                      {departments.map((dept) => (
                        <Card
                          key={dept.id}
                          className="outline-dashed shadow-none outline-2 outline-offset-[-1px] gap-2 p-5"
                        >
                          <div className="flex justify-between items-center mb-3">
                            {isCompanyEditing &&
                            showEditDepartmentForm[dept.id] ? (
                              <div className="flex flex-col gap-3 w-full">
                                <Input
                                  type="text"
                                  id={`edit_department_${dept.id}`}
                                  name={`edit_department_${dept.id}`}
                                  placeholder="Edit department name"
                                  value={editDepartmentName[dept.id] || ""}
                                  onChange={(e) =>
                                    setEditDepartmentName((prev) => ({
                                      ...prev,
                                      [dept.id]: e.target.value,
                                    }))
                                  }
                                />
                                <div className="flex flex-row gap-3.5 justify-end">
                                  <Button
                                    disabled={loading}
                                    variant={"outline"}
                                    className="w-fit"
                                    onClick={() =>
                                      handleCancelEditDepartment(dept.id)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    disabled={loading}
                                    variant={"default"}
                                    className="w-fit"
                                    onClick={() => EditDepartment(dept.id)}
                                  >
                                    {!loading ? (
                                      <>
                                        <svg
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M17 21V13H7V21"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M7 3V8H15"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        <span className="ml-1">Save</span>
                                      </>
                                    ) : (
                                      <Spinner size="small" />
                                    )}
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Label className="w-fit font-semibold">
                                {dept.name}
                              </Label>
                            )}

                            {isCompanyEditing &&
                              !showEditDepartmentForm[dept.id] && (
                                <DropdownMenu
                                  open={openDepartmentDropdownId === dept.id}
                                  onOpenChange={(isOpen) => {
                                    setOpenDepartmentDropdownId(
                                      isOpen ? dept.id : null
                                    );
                                  }}
                                >
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                          stroke="black"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                                          stroke="black"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                                          stroke="black"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent className="w-fit h-fit">
                                    <DropdownMenuItem
                                      className="w-full h-fit cursor-pointer"
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        handleAddPositionClick(dept.id);
                                      }}
                                    >
                                      Add Position
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="w-full h-fit cursor-pointer"
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        handleEditDepartment(dept.id);
                                      }}
                                    >
                                      Edit Department
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="w-full h-fit cursor-pointer text-danger-900"
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        setOpenDepartmentDropdownId(null); // Selalu tutup dropdown saat memilih

                                        // // Periksa apakah departemen itu sendiri sedang digunakan
                                        // const isDepartmentDirectlyInUse =
                                        //   departmentsInUse.includes(dept.id);

                                        // // Periksa apakah ada posisi di dalam departemen ini yang sedang digunakan
                                        // const areAnyPositionsInUse =
                                        //   positionsInUse.some(
                                        //     (pos) => pos.deptId === dept.id
                                        //   );

                                        // if (
                                        //   isDepartmentDirectlyInUse ||
                                        //   areAnyPositionsInUse
                                        // ) {
                                        //   if (isDepartmentDirectlyInUse) {
                                        //     setInUseMessage(
                                        //       // `Departemen "${dept.name}" tidak dapat dihapus karena sedang digunakan oleh karyawan.`
                                        //       `Department "${dept.name}" cannot be deleted because it is being used by an employee.`
                                        //     );
                                        //   } else if (areAnyPositionsInUse) {
                                        //     // Anda dapat membuat pesan ini lebih spesifik dengan mencantumkan posisi jika diperlukan
                                        //     setInUseMessage(
                                        //       // `Departemen "${dept.name}" tidak dapat dihapus karena beberapa posisinya sedang digunakan oleh karyawan.`
                                        //       `The department "${dept.name}" cannot be deleted because some of its positions are already occupied by employees.`
                                        //     );
                                        //   }
                                        //   setShowInUseAlertDialog(true); // Tampilkan dialog peringatan
                                        // } else {
                                        //   // Jika departemen maupun posisinya tidak sedang digunakan, lanjutkan dengan penghapusan
                                        //   openDeleteDepartmentDialog(
                                        //     dept.id,
                                        //     dept.name
                                        //   );
                                        // }
                                        openDeleteDepartmentDialog(
                                          dept.id,
                                          dept.name
                                        );
                                      }}
                                    >
                                      Delete Department
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                          </div>

                          {isCompanyEditing && showAddPositionForm[dept.id] && (
                            <div className="flex flex-row gap-2 mb-3">
                              <Input
                                type="text"
                                id={`add_position_${dept.id}`}
                                name={`add_position_${dept.id}`}
                                placeholder="Enter position name"
                                value={newPositionName[dept.id] || ""}
                                onChange={(e) =>
                                  setNewPositionName((prev) => ({
                                    ...prev,
                                    [dept.id]: e.target.value,
                                  }))
                                }
                              />
                              <Button
                                variant="default"
                                className="h-fit w-fit"
                                onClick={() => AddPosition(dept.id)}
                                disabled={loading}
                              >
                                {!loading ? (
                                  <span>Add +</span>
                                ) : (
                                  <Spinner size="small" />
                                )}
                              </Button>
                            </div>
                          )}

                          <div className="pl-5">
                            {dept.positions.filter((position) =>
                              position.name?.trim()
                            ).length === 0 ? (
                              <p className="text-gray-500 italic">
                                Positions are empty. Please add some!
                              </p>
                            ) : (
                              <ul className="list-disc space-y-2">
                                {dept.positions
                                  .filter((position) => position.name?.trim())
                                  .map((position) => (
                                    <li key={position.id}>
                                      {isCompanyEditing &&
                                      showEditPositionForm[dept.id]?.[
                                        position.id
                                      ] ? (
                                        <div className="flex flex-col gap-2">
                                          <Input
                                            type="text"
                                            id={`edit_position_${dept.id}_${position.id}`}
                                            name={`edit_position_${dept.id}_${position.id}`}
                                            placeholder="Edit position name"
                                            value={
                                              editPositionName[dept.id]?.[
                                                position.id
                                              ] || ""
                                            }
                                            onChange={(e) =>
                                              setEditPositionName((prev) => ({
                                                ...prev,
                                                [dept.id]: {
                                                  ...prev[dept.id],
                                                  [position.id]: e.target.value,
                                                },
                                              }))
                                            }
                                          />
                                          <div className="flex flex-row gap-2 justify-end">
                                            <Button
                                              disabled={loading}
                                              className="w-fit h-fit"
                                              variant={"outline"}
                                              onClick={() =>
                                                handleCancelEditPosition(
                                                  dept.id,
                                                  position.id
                                                )
                                              }
                                            >
                                              Cancel
                                            </Button>
                                            <Button
                                              disabled={loading}
                                              className="w-fit h-fit"
                                              variant={"default"}
                                              onClick={() =>
                                                EditPosition(
                                                  dept.id,
                                                  position.id
                                                )
                                              }
                                            >
                                              {!loading ? (
                                                <>
                                                  <svg
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                                                      stroke="white"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M17 21V13H7V21"
                                                      stroke="white"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M7 3V8H15"
                                                      stroke="white"
                                                      strokeWidth="2"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  <span className="ml-1">
                                                    Save
                                                  </span>
                                                </>
                                              ) : (
                                                <Spinner size="small" />
                                              )}
                                            </Button>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="flex justify-between items-center">
                                          <span>{position.name}</span>

                                          {isCompanyEditing && (
                                            <div className="flex flex-row gap-0.5">
                                              <Button
                                                variant="ghost"
                                                onClick={() =>
                                                  handleEditPosition(
                                                    dept.id,
                                                    position.id
                                                  )
                                                }
                                                className="w-fit h-fit p-1.5"
                                                icon={
                                                  <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M14.5 2.49998C14.8978 2.10216 15.4374 1.87866 16 1.87866C16.2786 1.87866 16.5544 1.93353 16.8118 2.04014C17.0692 2.14674 17.303 2.303 17.5 2.49998C17.697 2.69697 17.8532 2.93082 17.9598 3.18819C18.0665 3.44556 18.1213 3.72141 18.1213 3.99998C18.1213 4.27856 18.0665 4.55441 17.9598 4.81178C17.8532 5.06915 17.697 5.303 17.5 5.49998L5 18L1 19L2 15L14.5 2.49998Z"
                                                      stroke="black"
                                                      strokeWidth="1.8"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                }
                                              ></Button>
                                              <Button
                                                variant="ghost"
                                                className="w-fit h-fit p-1.5"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  // Periksa apakah posisi ini ada di daftar `positionsInUse`
                                                  const isPositionCurrentlyInUse =
                                                    positionsInUse.some(
                                                      (info) =>
                                                        info.deptId ===
                                                          dept.id &&
                                                        info.positionName ===
                                                          position.name
                                                    );

                                                  if (
                                                    isPositionCurrentlyInUse
                                                  ) {
                                                    setInUseMessage(
                                                      // `Posisi "${position}" di departemen "${dept.name}" tidak dapat dihapus karena sedang digunakan oleh karyawan.`
                                                      `The position "${position}" in the department "${dept.name}" cannot be deleted because it is being used by an employee.`
                                                    );
                                                    setShowInUseAlertDialog(
                                                      true
                                                    ); // Tampilkan dialog peringatan
                                                  } else {
                                                    openDeletePositionDialog(
                                                      dept.id,
                                                      position.id,
                                                      position.name
                                                    ); // Lanjutkan ke dialog konfirmasi penghapusan biasa
                                                  }
                                                }}
                                                icon={
                                                  <svg
                                                    width="19"
                                                    height="18"
                                                    viewBox="0 0 19 18"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                    <path
                                                      d="M16.582 3H14.257C14.083 2.15356 13.6224 1.39301 12.953 0.846539C12.2835 0.300068 11.4462 0.00109089 10.582 0L9.08203 0C8.21788 0.00109089 7.38052 0.300068 6.71109 0.846539C6.04167 1.39301 5.5811 2.15356 5.40703 3H3.08203C2.88312 3 2.69235 3.07902 2.5517 3.21967C2.41105 3.36032 2.33203 3.55109 2.33203 3.75C2.33203 3.94891 2.41105 4.13968 2.5517 4.28033C2.69235 4.42098 2.88312 4.5 3.08203 4.5H3.83203V14.25C3.83322 15.2442 4.22869 16.1973 4.9317 16.9003C5.6347 17.6033 6.58783 17.9988 7.58203 18H12.082C13.0762 17.9988 14.0294 17.6033 14.7324 16.9003C15.4354 16.1973 15.8308 15.2442 15.832 14.25V4.5H16.582C16.7809 4.5 16.9717 4.42098 17.1124 4.28033C17.253 4.13968 17.332 3.94891 17.332 3.75C17.332 3.55109 17.253 3.36032 17.1124 3.21967C16.9717 3.07902 16.7809 3 16.582 3V3ZM9.08203 1.5H10.582C11.0472 1.50057 11.5009 1.64503 11.8807 1.91358C12.2606 2.18213 12.5481 2.56162 12.7038 3H6.96028C7.11597 2.56162 7.40346 2.18213 7.78332 1.91358C8.16319 1.64503 8.61683 1.50057 9.08203 1.5V1.5ZM14.332 14.25C14.332 14.8467 14.095 15.419 13.673 15.841C13.2511 16.2629 12.6788 16.5 12.082 16.5H7.58203C6.98529 16.5 6.413 16.2629 5.99104 15.841C5.56908 15.419 5.33203 14.8467 5.33203 14.25V4.5H14.332V14.25Z"
                                                      fill="#BA3C54"
                                                    />
                                                    <path
                                                      d="M8.33203 13.4995C8.53094 13.4995 8.72171 13.4205 8.86236 13.2798C9.00301 13.1392 9.08203 12.9484 9.08203 12.7495V8.24953C9.08203 8.05061 9.00301 7.85985 8.86236 7.7192C7.66105 7.57854 8.53094 7.49953 8.33203 7.49953C8.13312 7.49953 7.94235 7.57854 7.8017 7.7192C7.66105 7.85985 7.58203 8.05061 7.58203 8.24953V12.7495C7.58203 12.9484 7.66105 13.1392 7.8017 13.2798C7.94235 13.4205 8.13312 13.4995 8.33203 13.4995Z"
                                                      fill="#BA3C54"
                                                    />
                                                    <path
                                                      d="M11.332 13.4995C11.5309 13.4995 11.7217 13.4205 11.8624 13.2798C12.003 13.1392 12.082 12.9484 12.082 12.7495V8.24953C12.082 8.05061 12.003 7.85985 11.8624 7.7192C11.7217 7.57854 11.5309 7.49953 11.332 7.49953C11.1331 7.49953 10.9424 7.57854 10.8017 7.7192C10.661 7.85985 10.582 8.05061 10.582 8.24953V12.7495C10.582 12.9484 10.661 13.1392 10.8017 13.2798C10.9424 13.4205 11.1331 13.4995 11.332 13.4995Z"
                                                      fill="#BA3C54"
                                                    />
                                                  </svg>
                                                }
                                              ></Button>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {isCompanyEditing && (
                  <div className="flex flex-row gap-3.5 justify-end mt-4">
                    <Button
                      disabled={loading}
                      variant={"outline"}
                      className="w-fit"
                      onClick={handleCancelCompanyEdit}
                    >
                      Exit Editing
                    </Button>
                    <Button
                      disabled={loading}
                      variant={"default"}
                      className="w-fit"
                      // onClick={handleSaveCompanyEdit}
                      onClick={editCompany}
                    >
                      {!loading ? (
                        <>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17 21V13H7V21"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7 3V8H15"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span className="ml-1">Save</span>
                        </>
                      ) : (
                        <Spinner size="small" />
                      )}
                    </Button>
                  </div>
                )}
              </Card>
            </Card>
          )}
        </div>

        {/* Delete Department Confirmation Dialog */}
        <AlertDialog
          open={showDeleteDepartmentConfirmDialog}
          onOpenChange={(open) => {
            setShowDeleteDepartmentConfirmDialog(open);
            if (!open) {
              setDepartmentToDelete({ id: null, name: "" });
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{" "}
                <span className="font-semibold">{departmentToDelete.name}</span>{" "}
                department and all its associated positions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-fit" disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white"
                onClick={DeleteDepartment}
                disabled={loading}
              >
                {!loading ? <span>Delete</span> : <Spinner size="small" />}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Position Confirmation Dialog */}
        <AlertDialog
          open={showDeletePositionConfirmDialog}
          onOpenChange={(open) => {
            setShowDeletePositionConfirmDialog(open);
            if (!open) {
              setPositionToDeleteInfo(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the{" "}
                <span className="font-semibold">
                  {positionToDeleteInfo?.positionName}
                </span>{" "}
                position.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-fit" disabled={loading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white"
                onClick={DeletePosition}
                disabled={loading}
              >
                {!loading ? <span>Delete</span> : <Spinner size="small" />}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={showInUseAlertDialog}
          onOpenChange={setShowInUseAlertDialog}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deletion Not Allowed</AlertDialogTitle>
              <AlertDialogDescription>
                {inUseMessage}
                <br />
                Please make sure there are no employees associated with this
                item before attempting to delete it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="w-fit">Oke</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Department In Use Confirmation Dialog */}
        <AlertDialog
          open={showEditDepartmentInUseDialog}
          onOpenChange={(open) => {
            setShowEditDepartmentInUseDialog(open);
            if (!open) {
              setDepartmentToEditInfo(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Confirm Department Name Change
              </AlertDialogTitle>
              <AlertDialogDescription>
                <br />
                This action will update all associated employee records from
                <span className="font-semibold">
                  {departmentToEditInfo?.oldName}
                </span>
                department to
                <span className="font-semibold">
                  {departmentToEditInfo?.newName}
                </span>
                department.
                <br />
                Are you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={loading}
                className="w-fit"
                onClick={() => {
                  // Reset the edit form state if cancelled from this dialog
                  if (departmentToEditInfo?.id !== null) {
                    handleCancelEditDepartment(departmentToEditInfo!.id);
                  }
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-auto bg-warning-500 text-white hover:bg-warning-600"
                onClick={confirmSaveEditDepartment}
              >
                Continue Saving
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Edit Position In Use Confirmation Dialog */}
        <AlertDialog
          open={showEditPositionInUseDialog}
          onOpenChange={(open) => {
            setShowEditPositionInUseDialog(open);
            if (!open) {
              setPositionToEditInfo(null);
            }
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Position Name Change</AlertDialogTitle>
              <AlertDialogDescription>
                This action will update all associated employee records from
                <span className="font-semibold">
                  {"}{positionToEditInfo?.oldName}{"}
                </span>{" "}
                position to{" "}
                <span className="font-semibold">
                  {"}{positionToEditInfo?.newName}{"}
                </span>{" "}
                position.
                <br />
                Are you sure you want to proceed?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                disabled={loading}
                className="w-fit"
                onClick={() => {
                  // Reset the edit form state if cancelled from this dialog
                  if (positionToEditInfo) {
                    handleCancelEditPosition(
                      positionToEditInfo.deptId,
                      positionToEditInfo.positionId
                    );
                  }
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="w-auto bg-warning-500 text-white hover:bg-warning-600"
                onClick={confirmSaveEditPosition}
              >
                Continue Saving
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Sidebar>
    </>
  );
}
