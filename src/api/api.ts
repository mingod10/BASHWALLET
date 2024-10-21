// Simulated API calls using local storage for demonstration purposes
const LOCAL_STORAGE_KEY = 'employees';
const CARD_REQUESTS_KEY = 'cardRequests';

interface Employee {
  id: number;
  uniqueId: string;
  name: string;
  idNumber: string;
  status: string;
  cardNumber: string;
  totalBalance: number;
  usageCount: number;
  activationDate: string;
  email: string;
  cellPhone: string;
  service: string;
}

interface CardRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeUniqueId: string;
  status: 'En Proceso' | 'Activa' | 'Bloqueada' | 'Anulada';
  cardNumber: string | null;
  totalBalance: number;
  usageCount: number;
  activationDate: string | null;
}

export const fetchEmployees = async (): Promise<Employee[]> => {
  const storedEmployees = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedEmployees ? JSON.parse(storedEmployees) : [];
};

export const createEmployee = async (employeeData: Partial<Employee>): Promise<Employee> => {
  const employees = await fetchEmployees();
  const newEmployee: Employee = {
    id: Date.now(),
    uniqueId: `EMP${String(employees.length + 1).padStart(4, '0')}`,
    name: `${employeeData.firstName} ${employeeData.lastName}`,
    idNumber: employeeData.idNumber || '',
    status: 'Active',
    cardNumber: '',
    totalBalance: 0,
    usageCount: 0,
    activationDate: new Date().toISOString().split('T')[0],
    email: employeeData.email || '',
    cellPhone: employeeData.cellPhone || '',
    service: employeeData.service || '',
  };
  employees.push(newEmployee);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
  return newEmployee;
};

export const updateEmployeeStatus = async (employeeId: number, newStatus: string): Promise<void> => {
  const employees = await fetchEmployees();
  const updatedEmployees = employees.map(emp => 
    emp.id === employeeId ? { ...emp, status: newStatus } : emp
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEmployees));
};

export const fetchCardRequests = async (): Promise<CardRequest[]> => {
  const storedRequests = localStorage.getItem(CARD_REQUESTS_KEY);
  return storedRequests ? JSON.parse(storedRequests) : [];
};

export const createCardRequest = async (employeeId: number): Promise<void> => {
  const employees = await fetchEmployees();
  const cardRequests = await fetchCardRequests();
  const employee = employees.find(emp => emp.id === employeeId);

  if (employee) {
    const newRequest: CardRequest = {
      id: Date.now(),
      employeeId: employee.id,
      employeeName: employee.name,
      employeeUniqueId: employee.uniqueId,
      status: 'En Proceso',
      cardNumber: null,
      totalBalance: 0,
      usageCount: 0,
      activationDate: null,
    };
    cardRequests.push(newRequest);
    localStorage.setItem(CARD_REQUESTS_KEY, JSON.stringify(cardRequests));
  }
};

export const updateCardRequestStatus = async (requestId: number, newStatus: CardRequest['status']): Promise<void> => {
  const cardRequests = await fetchCardRequests();
  const updatedRequests = cardRequests.map(req => 
    req.id === requestId ? { ...req, status: newStatus } : req
  );
  localStorage.setItem(CARD_REQUESTS_KEY, JSON.stringify(updatedRequests));
};

export const fetchEmployeesWithoutCards = async (): Promise<Employee[]> => {
  const employees = await fetchEmployees();
  const cardRequests = await fetchCardRequests();

  return employees.filter(employee => 
    employee.service === 'tarjeta' && 
    !cardRequests.some(request => 
      request.employeeId === employee.id && 
      (request.status === 'En Proceso' || request.status === 'Activa')
    )
  );
};