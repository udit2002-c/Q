export const medicinesAndTests = [
  { id: 1, name: "Paracetamol", description: "Pain reliever and fever reducer", price: 5, type: "medicine" },
  { id: 2, name: "Amoxicillin", description: "Antibiotic", price: 10, type: "medicine" },
  { id: 3, name: "Blood Test", description: "Complete blood count", price: 50, type: "test" },
  { id: 4, name: "X-Ray", description: "Chest X-ray", price: 100, type: "test" },
  { id: 5, name: "Ibuprofen", description: "Anti-inflammatory", price: 7, type: "medicine" },
  { id: 6, name: "MRI Scan", description: "Magnetic Resonance Imaging", price: 500, type: "test" },
];

export const prescriptions = [
  { id: 1, name: "Paracetamol", description: "For fever", quantity: 10, datePrescribed: "2023-06-01", type: "medicine", isDoneByDepartment: false },
  { id: 2, name: "Blood Test", description: "Complete blood count", quantity: 1, datePrescribed: "2023-06-02", type: "test", isDoneByDepartment: true },
];

