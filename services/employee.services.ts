import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import Address from "../entities/address.entity";
import CreateAddressDto from "../dto/create-address.dto";

class EmployeeService{
    constructor(private employeeRepository: EmployeeRepository){}

    async createEmployee(email: string, name: string, age: number, address: CreateAddressDto): Promise<Employee> {
        const newEmployee = new Employee();
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        const addressObj= new Address();
        addressObj.line1 = address.line1;
        addressObj.line1 = address.pincode;
        newEmployee.address = addressObj;
        
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findMany();
    }

    async getEmployeeById(id: number): Promise<Employee> {
        return this.employeeRepository.findOneById(id);
    }

    async updateEmployee(id: number, email: string, name: string){
        const existingEmployee = await this.employeeRepository.findOneById(id);
        if (existingEmployee){
        const employee = new Employee();
            employee.name = name;
            employee.email = email;
            await this.employeeRepository.update(id, employee);
        }
    }

    /*async deleteEmployee(id:number, req: Request, res: Response){
        const existingEmployee =await this.employeeRepository.findOneById(id);
        if (Employee){
        await this.employeeRepository.delete(Employee);
        }
    }*/

}

export default EmployeeService
