using Microsoft.AspNetCore.Mvc;
using EmployeeManagement.Api.Models;

namespace EmployeeManagement.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private static List<Employee> _employees = new List<Employee>
        {
            new Employee { Id = 1, Name = "Admin User", Role = "CEO", Salary = 150000, Email = "admin@company.com", Department = "Executive", JoinedDate = DateTime.Now.AddYears(-5) },
            new Employee { Id = 2, Name = "Sarah Jenkins", Role = "Senior Developer", Salary = 120000, Email = "sarah.j@company.com", Department = "Engineering", JoinedDate = DateTime.Now.AddYears(-2) },
            new Employee { Id = 3, Name = "Mike Ross", Role = "Legal Counsel", Salary = 95000, Email = "mike.r@company.com", Department = "Legal", JoinedDate = DateTime.Now.AddYears(-1) },
            new Employee { Id = 4, Name = "Emma Wilson", Role = "Product Manager", Salary = 110000, Email = "emma.w@company.com", Department = "Product", JoinedDate = DateTime.Now.AddMonths(-8) }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetEmployees()
        {
            return Ok(_employees);
        }

        [HttpGet("{id}")]
        public ActionResult<Employee> GetEmployee(int id)
        {
            var employee = _employees.FirstOrDefault(e => e.Id == id);
            if (employee == null) return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public ActionResult<Employee> CreateEmployee(Employee employee)
        {
            employee.Id = _employees.Any() ? _employees.Max(e => e.Id) + 1 : 1;
            _employees.Add(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateEmployee(int id, Employee employee)
        {
            var existing = _employees.FirstOrDefault(e => e.Id == id);
            if (existing == null) return NotFound();

            existing.Name = employee.Name;
            existing.Role = employee.Role;
            existing.Salary = employee.Salary;
            existing.Email = employee.Email;
            existing.Department = employee.Department;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEmployee(int id)
        {
            var employee = _employees.FirstOrDefault(e => e.Id == id);
            if (employee == null) return NotFound();
            _employees.Remove(employee);
            return NoContent();
        }

        [HttpGet("stats")]
        public IActionResult GetStats()
        {
            var stats = new
            {
                TotalEmployees = _employees.Count,
                TotalPayroll = _employees.Sum(e => e.Salary),
                AverageSalary = _employees.Any() ? _employees.Average(e => e.Salary) : 0,
                Departments = _employees.Select(e => e.Department).Distinct().Count()
            };
            return Ok(stats);
        }
    }
}
