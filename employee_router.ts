import express from "express";
import Employee from "./entities/employee.entity";
import { Entity } from "typeorm";
import datasource from "./db/data-source";

const employeeRouter = express.Router();
/*let count = 2;
let employees: Employee[] = [
  {
    id: 1,
    email: "employee1@gmail.com",
    name: "Employee1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    email: "employee2@gmail.com",
    name: "Employee2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

*/

employeeRouter.get("/", async (req, res) => {
  const employeeRepository = datasource.getRepository(Employee);
  const employees= await employeeRepository.find();
  res.status(200).send(employees);
});

employeeRouter.get("/:id", async(req, res)=>{

  const empId=Number(req.params["id"]);
  const employeeRepository = datasource.getRepository(Employee);
  const employee = await employeeRepository.findOneBy({id: empId});
  res.status(200).send({});
});

employeeRouter.post("/", async (req, res)=>{
  const employeeRepository = datasource.getRepository(Employee);
  const employee= {id: 2, email:"anil@gmail.com", name:"Anil"};
  const employeeRes =await employeeRepository.insert(employee); 
  res.status(201).send(employeeRes);
});

  employeeRouter.put("/:id", async (req, res)=>{
  const employeeRepository = datasource.getRepository(Employee);
  const empId=Number(req.params["id"]);
  const employee = await employeeRepository.findOneBy({id: empId});
  employee.name='Pooja';
  employee.email='pooja@gmail.com';
  await employeeRepository.update(empId, employee);
  res.status(200).send(employee);

})

employeeRouter.delete("/:id", async (req, res)=>{
  const employeeRepository = datasource.getRepository(Employee);
  const empId=Number(req.params["id"]);
  await employeeRepository.delete(empId);
  res.status(204).send();
})



/*employeeRouter.get("/:id", (req, res) => {
  const empId = Number(req.params["id"]);
  const employee = employees.find((emp) => emp.id === empId);
  if (!employee) {
    res.status(404).send("Employee not found");
    return;
  }
  res.status(200).send(employee);
});

employeeRouter.post("/", (req, res) => {
  console.log(req.body);
  const newEmployee = new Employee();
  newEmployee.email = req.body.email;
  newEmployee.name = req.body.name;
  newEmployee.createdAt = new Date();
  newEmployee.updatedAt = new Date();
  newEmployee.id = ++count;
  employees.push(newEmployee);
  res.status(200).send(newEmployee);
});

employeeRouter.delete("/:id", (req, res) => {
  const employeeIdxToDelete = employees.findIndex(
    (emp) => emp.id === Number(req.params["id"]),
  );
  employees.splice(employeeIdxToDelete, 1);
  res.status(200).send();
});

employeeRouter.put("/:id", (req, res) => {
  const employee = employees.find((emp) => emp.id === Number(req.params["id"]));
  employee.email = req.body.email;
  employee.name = req.body.name;
  employee.updatedAt = new Date();
  console.log("update employees");
  res.status(200).send(employee);
});

*/

export default employeeRouter;
