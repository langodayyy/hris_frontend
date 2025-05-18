function EmploymentContractForm() {
  return `
    <p>This Employment Contract is made and entered into on <strong>{{contractDate}}</strong> between <strong>{{companyName}}</strong> and <strong>{{employeeName}}</strong>.</p>
    <p>Job Title: <strong>{{jobTitle}}</strong></p>
    <p>Start Date: <strong>{{startDate}}</strong></p>
    <p>Salary: <strong>{{salary}}</strong></p>
  `
}

function EmploymentContractForm2() {
  return `
    <p>This is another type of contract for <strong>{{employeeName}}</strong> working at <strong>{{companyName}}</strong>.</p>
    <p>Contract starts on <strong>{{startDate}}</strong> with a monthly wage of <strong>{{salary}}</strong>.</p>
    <p>This contract ends on <strong>{{endDate}}</strong>.</p>
  `
}

// Ekspor semua fungsi template
export {
  EmploymentContractForm,
  EmploymentContractForm2
}
