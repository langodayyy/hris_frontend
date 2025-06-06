"use client";

import Sidebar from "@/components/sidebar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
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
import { useState } from "react";

export default function Profile() {
  // avatar state
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
  const [originalAvatarPreview, setOriginalAvatarPreview] = useState(null);
  const [originalSelectedAvatarFile, setOriginalSelectedAvatarFile] =
    useState(null);

  // department state
  const [showAddDepartmentForm, setShowAddDepartmentForm] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [showEditDepartmentForm, setShowEditDepartmentForm] = useState({}); // New state for edit department form visibility
  const [editDepartmentName, setEditDepartmentName] = useState({}); // New state for editing department name

  // position state
  const [showAddPositionForm, setShowAddPositionForm] = useState({});
  const [newPositionName, setNewPositionName] = useState({});
  // New states for editing positions
  const [showEditPositionForm, setShowEditPositionForm] = useState({}); // { deptId: { positionIndex: true } }
  const [editPositionName, setEditPositionName] = useState({}); // { deptId: { positionIndex: "new name" } }

  // editing state
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [isCompanyEditing, setIsCompanyEditing] = useState(false);

  // profile dummy state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+6281234567890",
    email: "john.doe@example.com",
  });
  const [companyName, setCompanyName] = useState("Acme Corporation");
  const [originalProfileData, setOriginalProfileData] = useState(profileData);
  const [originalCompanyName, setOriginalCompanyName] = useState(companyName);
  const [originalDepartments, setOriginalDepartments] = useState(departments);

  // dropdown state untuk header Profile
  const [isHeaderDropdownOpen, setIsHeaderDropdownOpen] = useState(false);
  // dropdown state untuk setiap department card
  const [openDepartmentDropdownId, setOpenDepartmentDropdownId] =
    useState(null); // Menyimpan ID departemen yang dropdownnya terbuka

  // state show dialog for change password
  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);

  // states for delete confirmation dialogs
  const [showDeleteDepartmentConfirmDialog, setShowDeleteDepartmentConfirmDialog] =
    useState(false);
  const [departmentToDeleteId, setDepartmentToDeleteId] = useState(null);
  const [departmentToDeleteName, setDepartmentToDeleteName] = useState("");

  const [showDeletePositionConfirmDialog, setShowDeletePositionConfirmDialog] =
    useState(false);
  const [positionToDeleteInfo, setPositionToDeleteInfo] = useState(null); // { deptId: number, positionIndex: number, positionName: string }


  // fungsi handle perubahan avatar
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    } else {
      setSelectedAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  // fungsi handle icon edit di profile information
  const handleEditProfileClick = () => {
    if (!isProfileEditing) {
      setOriginalProfileData(profileData);
      setOriginalAvatarPreview(avatarPreview); // Save current avatar preview
      setOriginalSelectedAvatarFile(selectedAvatarFile); // Save current avatar file
      setIsProfileEditing(true);
    }
  };

  // fungsi handle button cancel edit di profile
  const handleCancelProfileEdit = () => {
    setProfileData(originalProfileData);
    setAvatarPreview(originalAvatarPreview); // Restore original avatar preview
    setSelectedAvatarFile(originalSelectedAvatarFile); // Restore original avatar file
    setIsProfileEditing(false);
  };

  // fungsi handle button save di edit profile
  const handleSaveProfileEdit = () => {
    console.log("Saving profile data:", profileData);
    // Add logic here to upload selectedAvatarFile to server
    setIsProfileEditing(false);
    setOriginalProfileData(profileData);
    // Optionally clear original avatar states after save
    setOriginalAvatarPreview(null);
    setOriginalSelectedAvatarFile(null);
  };

  // fungsi handle icon edit di company information
  const handleEditCompanyClick = () => {
    if (!isCompanyEditing) {
      setOriginalCompanyName(companyName);
      setOriginalDepartments(departments);
      setIsCompanyEditing(true);
    }
  };

  // fungsi handle button cancel di edit company
  const handleCancelCompanyEdit = () => {
    setCompanyName(originalCompanyName);
    setDepartments(originalDepartments);
    setShowAddDepartmentForm(false);
    setNewDepartmentName("");
    setShowAddPositionForm({});
    setNewPositionName({});
    setShowEditDepartmentForm({}); // Reset edit department form visibility
    setEditDepartmentName({}); // Reset edit department name
    setShowEditPositionForm({}); // Reset edit position form visibility
    setEditPositionName({}); // Reset edit position name
    setIsCompanyEditing(false);
  };

  // fungsi handle button save di edit company
  const handleSaveCompanyEdit = () => {
    console.log("Saving company name:", companyName);
    console.log("Saving departments and positions:", departments);
    setIsCompanyEditing(false);
    setShowAddDepartmentForm(false);
    setNewDepartmentName("");
    setShowAddPositionForm({});
    setNewPositionName({});
    setShowEditDepartmentForm({}); // Reset edit department form visibility
    setEditDepartmentName({}); // Reset edit department name
    setShowEditPositionForm({}); // Reset edit position form visibility
    setEditPositionName({}); // Reset edit position name
    setOriginalCompanyName(companyName);
    setOriginalDepartments(departments);
  };

  // fungsi handle button add department
  const handleAddDepartmentClick = () => {
    setShowAddDepartmentForm(true);
  };

  // fungsi handle button add department yang menyimpan data
  const handleAddDepartmentSubmit = () => {
    if (newDepartmentName.trim() !== "") {
      const newId =
        departments.length > 0
          ? Math.max(...departments.map((d) => d.id)) + 1
          : 1;
      const newDept = {
        id: newId,
        name: newDepartmentName.trim(),
        positions: [],
      };
      setDepartments([...departments, newDept]);
      setNewDepartmentName("");
      setShowAddDepartmentForm(false);
    }
  };

  // fungsi handle button add position
  const handleAddPositionClick = (deptId) => {
    setShowAddPositionForm((prev) => ({ ...prev, [deptId]: true }));
    setNewPositionName((prev) => ({ ...prev, [deptId]: "" })); // Clear previous input
    setOpenDepartmentDropdownId(null); // Close dropdown
    setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false })); // Hide edit dept form if open
    setShowEditPositionForm((prev) => ({ ...prev, [deptId]: {} })); // Hide all edit position forms for this department
  };

  // fungsi handle button add position yang menyimpan data
  const handleAddPositionSubmit = (deptId) => {
    const positionName = newPositionName[deptId]?.trim();
    if (positionName && positionName !== "") {
      setDepartments(
        departments.map((dept) =>
          dept.id === deptId
            ? { ...dept, positions: [...dept.positions, positionName] }
            : dept
        )
      );
      setNewPositionName((prev) => ({ ...prev, [deptId]: "" }));
      setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false }));
    }
  };

  // Handler untuk menutup DropdownMenu saat dialog dibuka (untuk header)
  const handleOpenChangePasswordDialog = () => {
    setIsHeaderDropdownOpen(false); // Pastikan dropdown header tertutup
    setShowChangePasswordDialog(true);
  };

  // Handler untuk simulasi save changes pada dialog password
  const handleChangePasswordSubmit = () => {
    // Lakukan logika simpan password di sini
    // console.log("Password changed!");
    setShowChangePasswordDialog(false); // Tutup dialog setelah simpan
  };

  // Fungsi untuk menghapus departemen
  const handleDeleteDepartment = (deptId) => {
    // Tambahkan konfirmasi jika diperlukan
    const updatedDepartments = departments.filter((dept) => dept.id !== deptId);
    setDepartments(updatedDepartments);
    setOpenDepartmentDropdownId(null); // Tutup dropdown setelah aksi
  };

  // Fungsi untuk mengedit departemen
  const handleEditDepartment = (deptId) => {
    const departmentToEdit = departments.find((dept) => dept.id === deptId);
    if (departmentToEdit) {
      setEditDepartmentName((prev) => ({
        ...prev,
        [deptId]: departmentToEdit.name,
      }));
      setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: true }));
      setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false })); // Hide add position form if open
      setShowEditPositionForm((prev) => ({ ...prev, [deptId]: {} })); // Hide all edit position forms for this department
      setOpenDepartmentDropdownId(null); // Close dropdown
    }
  };

  // Fungsi untuk menyimpan perubahan departemen yang diedit
  const handleSaveEditDepartment = (deptId) => {
    const newName = editDepartmentName[deptId]?.trim();
    if (newName && newName !== "") {
      setDepartments(
        departments.map((dept) =>
          dept.id === deptId ? { ...dept, name: newName } : dept
        )
      );
      setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
      setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" }));
    }
  };

  // Fungsi untuk membatalkan perubahan departemen yang diedit
  const handleCancelEditDepartment = (deptId) => {
    setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false }));
    setEditDepartmentName((prev) => ({ ...prev, [deptId]: "" })); // Clear the input field
  };

  // Fungsi untuk membuka dialog konfirmasi hapus departemen
  const openDeleteDepartmentDialog = (deptId, deptName) => {
    setDepartmentToDeleteId(deptId);
    setDepartmentToDeleteName(deptName);
    setShowDeleteDepartmentConfirmDialog(true);
    setOpenDepartmentDropdownId(null); // Close dropdown
  };

  // Fungsi untuk menghapus departemen setelah konfirmasi
  const confirmDeleteDepartment = () => {
    if (departmentToDeleteId !== null) {
      const updatedDepartments = departments.filter(
        (dept) => dept.id !== departmentToDeleteId
      );
      setDepartments(updatedDepartments);
      setDepartmentToDeleteId(null);
      setDepartmentToDeleteName("");
      setShowDeleteDepartmentConfirmDialog(false);
    }
  };

  // Fungsi untuk mengedit posisi
  const handleEditPosition = (deptId, positionIndex) => {
    const department = departments.find((dept) => dept.id === deptId);
    if (department && department.positions[positionIndex]) {
      // Set the specific position's name in the edit state
      setEditPositionName((prev) => ({
        ...prev,
        [deptId]: {
          ...prev[deptId],
          [positionIndex]: department.positions[positionIndex],
        },
      }));
      // Show the specific position's edit form
      setShowEditPositionForm((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionIndex]: true },
      }));
      setShowAddPositionForm((prev) => ({ ...prev, [deptId]: false })); // Hide add position form if open
      setShowEditDepartmentForm((prev) => ({ ...prev, [deptId]: false })); // Hide edit department form if open
    }
  };

  // Fungsi untuk menyimpan perubahan posisi yang diedit
  const handleSaveEditPosition = (deptId, positionIndex) => {
    const newPosition = editPositionName[deptId]?.[positionIndex]?.trim();
    if (newPosition && newPosition !== "") {
      setDepartments(
        departments.map((dept) =>
          dept.id === deptId
            ? {
                ...dept,
                positions: dept.positions.map((pos, idx) =>
                  idx === positionIndex ? newPosition : pos
                ),
              }
            : dept
        )
      );
      setShowEditPositionForm((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionIndex]: false },
      }));
      setEditPositionName((prev) => ({
        ...prev,
        [deptId]: { ...prev[deptId], [positionIndex]: "" },
      }));
    }
  };

  // Fungsi untuk membatalkan perubahan posisi yang diedit
  const handleCancelEditPosition = (deptId, positionIndex) => {
    setShowEditPositionForm((prev) => ({
      ...prev,
      [deptId]: { ...prev[deptId], [positionIndex]: false },
    }));
    setEditPositionName((prev) => ({
      ...prev,
      [deptId]: { ...prev[deptId], [positionIndex]: "" },
    })); // Clear the input field
  };

  // Fungsi untuk membuka dialog konfirmasi hapus posisi
  const openDeletePositionDialog = (deptId, positionIndex, positionName) => {
    setPositionToDeleteInfo({ deptId, positionIndex, positionName });
    setShowDeletePositionConfirmDialog(true);
  };

  // Fungsi untuk menghapus posisi setelah konfirmasi
  const confirmDeletePosition = () => {
    if (positionToDeleteInfo) {
      const { deptId, positionIndex } = positionToDeleteInfo;
      setDepartments(
        departments.map((dept) =>
          dept.id === deptId
            ? {
                ...dept,
                positions: dept.positions.filter(
                  (_, idx) => idx !== positionIndex
                ),
              }
            : dept
        )
      );
      setPositionToDeleteInfo(null);
      setShowDeletePositionConfirmDialog(false);
    }
  };

  return (
    <Sidebar title="">
      <div className="">
        <Card className="w-full h-fit px-5 py-7 gap-[15px]">
          <div className="flex flex-row justify-between">
            {/* title */}
            <span className="px-[10px] text-lg">Profile</span>

            {/* icn titik tiga - Header Profile */}
            <DropdownMenu
              open={isHeaderDropdownOpen}
              onOpenChange={setIsHeaderDropdownOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-fit h-fit">
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
                    handleOpenChangePasswordDialog();
                  }}
                >
                  Change password
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog Change Password */}
            <Dialog
              open={showChangePasswordDialog}
              onOpenChange={setShowChangePasswordDialog}
            >
              {/* form change password */}
              <DialogContent
                className="sm:max-w-[425px] bg-white"
                showCloseButton={false}
              >
                <AlertDialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                </AlertDialogHeader>
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
                    label="Confirmation New Password"
                    name="confirm_password"
                    id="confirm_password"
                    placeholder="Enter your new password"
                  />
                </div>
                <DialogFooter>
                  <div className="flex flex-row gap-3.5 justify-end mt-4">
                    <DialogClose asChild>
                      {/* Gunakan asChild untuk Button */}
                      <Button variant={"outline"} className="w-fit">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      variant={"default"}
                      className="w-fit"
                      onClick={handleChangePasswordSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* card profile information */}
          <div className="flex flex-col gap-5 px-5">
            <Card className="p-5">
              <div className="flex justify-between">
                <span className="text-lg">Profile Information</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-fit w-fit p-1"
                  onClick={handleEditProfileClick}
                >
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
                </Button>
              </div>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-5">
                  <div className="">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar Preview"
                        className="w-[78px] h-[78px] rounded-full object-cover border border-gray-300"
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
                          <rect width="78" height="78" rx="39" fill="#D1D5DB" />
                        </g>
                      </svg>
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      name="employee_photo"
                      accept="image/*"
                      id="employee_photo"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                    {isProfileEditing ? (
                      <Button variant="default">
                        <label
                          htmlFor="employee_photo"
                          className="cursor-pointer"
                        >
                          Edit Avatar
                        </label>
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col flex-1 gap-[8px]">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter first name"
                      value={profileData.firstName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          firstName: e.target.value,
                        })
                      }
                      disabled={!isProfileEditing}
                    />
                  </div>
                  <div className="flex flex-col flex-1 gap-[8px]">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter last name"
                      value={profileData.lastName}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          lastName: e.target.value,
                        })
                      }
                      disabled={!isProfileEditing}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col flex-1 gap-[8px]">
                    {isProfileEditing ? (
                      <FormPhoneInput
                        placeholder="Enter employee phone number"
                        value={profileData.phoneNumber}
                        onChange={(value) =>
                          setProfileData({ ...profileData, phoneNumber: value })
                        }
                      />
                    ) : (
                      <div className="flex flex-col flex-1 gap-[8px]">
                        <Label htmlFor="email">Phone Number</Label>
                        <Input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="isi"
                          value={profileData.phoneNumber}
                          disabled={!isProfileEditing}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 gap-[8px]">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter email"
                      value={profileData.email}
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
              </div>
              {isProfileEditing && (
                <div className="flex flex-row gap-3.5 justify-end mt-4">
                  <Button
                    variant={"outline"}
                    className="w-fit"
                    onClick={handleCancelProfileEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"default"}
                    className="w-fit"
                    onClick={handleSaveProfileEdit}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Card>

            <Card className="p-5">
              <div className="flex justify-between">
                <span className="text-lg">Company Information</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-1 h-auto w-auto"
                  onClick={handleEditCompanyClick}
                >
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
                </Button>
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div className="flex flex-col flex-1 gap-[8px]">
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
                </div>
                <div className="flex flex-col flex-1 gap-[8px]">
                  <Label htmlFor="add_department">
                    Departments & Positions
                  </Label>

                  {/* kondisi ketika edit company information & form add department hidden */}
                  {isCompanyEditing && !showAddDepartmentForm && (
                    <div className="flex flex-row gap-3">
                      <Button
                        variant="default"
                        className="h-fit w-fit"
                        onClick={handleAddDepartmentClick}
                      >
                        Add Department +
                      </Button>
                    </div>
                  )}

                  {/* kondisi ketika edit company information & add new department */}
                  {isCompanyEditing && showAddDepartmentForm && (
                    <div className="flex flex-row gap-5">
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
                        onClick={handleAddDepartmentSubmit}
                      >
                        Add +
                      </Button>
                    </div>
                  )}
                </div>

                {/* kondisi saat department masih kosong  */}
                {departments.length === 0 ? (
                  <div className="px-5 py-3">
                    <p className="text-gray-500 italic">
                      Departemen masih kosong. Silakan{" "}
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
                          tambahkan sekarang!
                        </a>
                      ) : (
                        "tambahkan departemen baru!"
                      )}
                    </p>
                  </div>
                ) : (
                  //jika ada isinya
                  <div className="flex-wrap gap-4 grid grid-cols-3">
                    {departments.map((dept) => (
                      <Card
                        key={dept.id}
                        className="outline-dashed shadow-none outline-2 outline-offset-[-1px] gap-2 p-5"
                      >
                        <div className="flex flex-wrap justify-between mb-3">
                          <Label className="w-fit font-semibold">
                            {dept.name}
                          </Label>

                          {/* Kondisi untuk menampilkan ikon titik tiga departemen (SELALU MUNCUL SAAT EDIT) */}
                          {isCompanyEditing && (
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
                                {/* add pcc */}
                                <DropdownMenuItem
                                  className="w-full h-fit cursor-pointer"
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    handleAddPositionClick(dept.id);
                                  }}
                                >
                                  Add Position
                                </DropdownMenuItem>

                                {/* edit dept */}
                                <DropdownMenuItem
                                  className="w-full h-fit cursor-pointer"
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    handleEditDepartment(dept.id);
                                  }}
                                >
                                  Edit Department
                                </DropdownMenuItem>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    {/* delete dept */}
                                    <DropdownMenuItem
                                      className="w-full h-fit cursor-pointer text-danger-900"
                                      onSelect={(e) => {
                                        e.preventDefault();
                                        // handleDeleteDepartment(dept.id);
                                        openDeleteDepartmentDialog(
                                          dept.id,
                                          dept.name
                                        );
                                      }}
                                    >
                                      Delete Department
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Are you absolutely sure?
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your data and remove
                                        your data from our servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="w-auto">
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction className="w-auto bg-danger-700 text-white border border-danger-700 hover:bg-danger-800 hover:text-white">
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>

                        {/* kondisi ketika edit company information & form edit department ditampilkan */}
                        {isCompanyEditing &&
                          showEditDepartmentForm[dept.id] && (
                            <div className="flex flex-col gap-3 mb-3">
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
                                  variant={"outline"}
                                  className="w-fit"
                                  onClick={() =>
                                    handleCancelEditDepartment(dept.id)
                                  }
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant={"default"}
                                  className="w-fit"
                                  onClick={() =>
                                    handleSaveEditDepartment(dept.id)
                                  }
                                >
                                  Save
                                </Button>
                              </div>
                            </div>
                          )}

                        {/* kondisi ketika edit company information & form add position ditampilkan */}
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
                              onClick={() => handleAddPositionSubmit(dept.id)}
                            >
                              Add +
                            </Button>
                          </div>
                        )}

                        <div className="px-5">
                          {dept.positions.length === 0 ? (
                            <p className="text-gray-500 italic">
                              Posisi masih kosong. Silakan tambahkan!
                            </p>
                          ) : (
                            <ul className="list-disc">
                              {dept.positions.map((position, index) => (
                                <li key={index}>
                                  {isCompanyEditing &&
                                  showEditPositionForm[dept.id]?.[index] ? (
                                    // Form edit posisi
                                    <div className="flex flex-col gap-3 mb-3">
                                      <Input
                                        type="text"
                                        id={`edit_position_${dept.id}_${index}`}
                                        name={`edit_position_${dept.id}_${index}`}
                                        placeholder="Edit position name"
                                        value={
                                          editPositionName[dept.id]?.[index] ||
                                          ""
                                        }
                                        onChange={(e) =>
                                          setEditPositionName((prev) => ({
                                            ...prev,
                                            [dept.id]: {
                                              ...prev[dept.id],
                                              [index]: e.target.value,
                                            },
                                          }))
                                        }
                                      />
                                      <div className="flex flex-row gap-3.5 justify-end">
                                        <Button
                                          variant={"outline"}
                                          className="w-fit"
                                          onClick={() =>
                                            handleCancelEditPosition(
                                              dept.id,
                                              index
                                            )
                                          }
                                        >
                                          Cancel
                                        </Button>
                                        <Button
                                          variant={"default"}
                                          className="w-fit"
                                          onClick={() =>
                                            handleSaveEditPosition(
                                              dept.id,
                                              index
                                            )
                                          }
                                        >
                                          Save
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    // Tampilan posisi normal
                                    <div className="flex justify-between items-center">
                                      <span>{position}</span>
                                      <div className="flex flex-row gap-0.5 justify-end">
                                        {/* icon edit */}
                                        {isCompanyEditing && (
                                          <Button
                                            variant="ghost"
                                            onClick={() =>
                                              handleEditPosition(dept.id, index)
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
                                        )}
                                        {/* icon hapus */}
                                        <Button
                                          variant="ghost"
                                          className="w-fit h-fit p-1.5"
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
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            openDeletePositionDialog(
                                              dept.id,
                                              index,
                                              position
                                            );
                                          }}
                                        ></Button>
                                      </div>
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
                    variant={"outline"}
                    className="w-fit"
                    onClick={handleCancelCompanyEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"default"}
                    className="w-fit"
                    onClick={handleSaveCompanyEdit}
                  >
                    Save
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </Card>
      </div>
    </Sidebar>
  );
}
