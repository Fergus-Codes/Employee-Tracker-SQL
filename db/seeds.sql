USE employee_db;

INSERT INTO department (name)
VALUES
    ("Customer Service"),
    ("Management"),
    ("Finance"),
    ("Warehousing"),
    ("IT"),
    ("Operations"),
    ("sales");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Customer Service Attendant", 40000, 1),
    ("Line Manager", 50000, 2),
    ("senior Accountant", 70000, 3),
    ("Warehouse attendant", 45000, 4),
    ("Digital security supervisor", 80000, 5),
    ("Operations manager", 90000, 6),
    ("Sales Consulatant", 75000, 7),
    ("Chief Executive Officer", 100000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Fergus", "Illman", 8, 1),
    ("James", "Alexandrou", 3, 1),
    ("Michael", "Moschakis", 2, 1),
    ("Oliver", "Gahan", 4, 1),
    ("John", "Gander", 3, 1),
    ("Harry", "Potter", 5, 1),
    ("Ronald", "Weasly", 6, 1),
    ("Joshua", "Ryals", 7, 1);
    
    