import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (employee: any) => void;
  initialData?: any;
}

const benefitOptions = [
  'Vale de alimentos',
  'Seguro de Salud',
  'Seguro de vida',
  'Fondo de Cesantia',
  'Telefono Celular',
  'Luz Electrica',
  'Internet',
  'Gasolina'
];

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idType: 'cedula',
    idNumber: '',
    cellPhone: '',
    email: '',
    service: 'tarjeta',
    hasTeleworkContract: false,
    activeBenefits: [] as string[],
  });

  const [allBenefitsActive, setAllBenefitsActive] = useState(false);
  const [idError, setIdError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.name.split(' ')[0] || '',
        lastName: initialData.name.split(' ').slice(1).join(' ') || '',
        idType: 'cedula',
        idNumber: initialData.idNumber || '',
        cellPhone: initialData.cellPhone || '',
        email: initialData.email || '',
        service: initialData.service || 'tarjeta',
        hasTeleworkContract: false,
        activeBenefits: [],
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));

    if (name === 'idType' || name === 'idNumber') {
      validateIdNumber(name === 'idType' ? value : formData.idType, name === 'idNumber' ? value : formData.idNumber);
    }

    if (name === 'hasTeleworkContract') {
      const isChecked = (e.target as HTMLInputElement).checked;
      if (!isChecked) {
        setFormData(prev => ({
          ...prev,
          activeBenefits: prev.activeBenefits.filter(b => b !== 'Luz Electrica' && b !== 'Internet')
        }));
      }
    }
  };

  const validateIdNumber = (idType: string, idNumber: string) => {
    if (idType === 'cedula' && !idNumber.includes('-')) {
      setIdError('Cédula must contain at least one hyphen (-)');
    } else {
      setIdError('');
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({ ...prev, cellPhone: value }));
  };

  const handleToggleAllBenefits = () => {
    setAllBenefitsActive(!allBenefitsActive);
    setFormData(prev => ({
      ...prev,
      activeBenefits: allBenefitsActive 
        ? [] 
        : benefitOptions.filter(benefit => 
            prev.hasTeleworkContract || (benefit !== 'Luz Electrica' && benefit !== 'Internet')
          )
    }));
  };

  const handleBenefitChange = (benefit: string) => {
    if (!formData.hasTeleworkContract && (benefit === 'Luz Electrica' || benefit === 'Internet')) {
      return;
    }
    setFormData(prev => ({
      ...prev,
      activeBenefits: prev.activeBenefits.includes(benefit)
        ? prev.activeBenefits.filter(b => b !== benefit)
        : [...prev.activeBenefits, benefit]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idError) {
      alert('Please correct the errors before submitting.');
      return;
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{initialData ? 'Editar' : 'Agregar'} Empleado</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Apellido</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo de Identificación</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="idType"
                  value="cedula"
                  checked={formData.idType === 'cedula'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Cédula</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="idType"
                  value="pasaporte"
                  checked={formData.idType === 'pasaporte'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Pasaporte</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700">Número de Identificación</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${idError ? 'border-red-500' : ''}`}
              required
            />
            {idError && <p className="mt-1 text-sm text-red-600">{idError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="cellPhone" className="block text-sm font-medium text-gray-700">Teléfono Celular</label>
            <PhoneInput
              country={'pa'}
              value={formData.cellPhone}
              onChange={handlePhoneChange}
              inputProps={{
                name: 'cellPhone',
                required: true,
                className: 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              }}
              inputStyle={{
                width: '100%',
                height: '38px',
                paddingLeft: '48px',
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Servicio</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="service"
                  value="tarjeta"
                  checked={formData.service === 'tarjeta'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Tarjeta</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  name="service"
                  value="digital"
                  checked={formData.service === 'digital'}
                  onChange={handleChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                />
                <span className="ml-2">Digital</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="hasTeleworkContract"
                  id="hasTeleworkContract"
                  checked={formData.hasTeleworkContract}
                  onChange={handleChange}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  htmlFor="hasTeleworkContract"
                  className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
              <span className="text-sm text-gray-700">Contrato de teletrabajo</span>
            </label>
          </div>
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-700">Beneficios Activos</label>
              <button
                type="button"
                onClick={handleToggleAllBenefits}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                {allBenefitsActive ? 'Desactivar Todos' : 'Activar Todos'}
              </button>
            </div>
            <div className="mt-2 space-y-2">
              {benefitOptions.map(benefit => {
                const isDisabled = !formData.hasTeleworkContract && (benefit === 'Luz Electrica' || benefit === 'Internet');
                return (
                  <label key={benefit} className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        type="checkbox"
                        id={`benefit-${benefit}`}
                        checked={formData.activeBenefits.includes(benefit)}
                        onChange={() => handleBenefitChange(benefit)}
                        className={`toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isDisabled}
                      />
                      <label
                        htmlFor={`benefit-${benefit}`}
                        className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      ></label>
                    </div>
                    <span className={`text-sm ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>{benefit}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {initialData ? 'Actualizar' : 'Agregar'} Empleado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;