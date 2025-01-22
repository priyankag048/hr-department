## Problem Statement

Design a simple Employee HR application that has the following functional requirements:
- Exposes HTTP endpoints for:
	- Onboarding a new employee to the company  ->  POST '/employees'
	- Associating a department to the employee   -> PUT '/employees/:employee_id'
	- Changing the department of an employee   -> PUT '/employees/:employee_id'
	- Offboarding an employee  --> DELETE /employees/emp_id OR PUT /employees/emp_id (Active false)
	- Showing all employees for a particular department /department/:dept_id/employees

Additionally, the following non-functional (but equally important) requirements have to be met:
- Guarantee of 99.9% availability at least
	- How would availability of the app be measured?
- Ensures all endpoint requests are audited (authentication/authorization is optional and out of scope)
- Ensures there is continuous monitoring/observability for the application
- Ensures each API is metered according to a fixed charge of 0.1$ per request after 1000 free requests

EXPECTATIONS:
- write REST-compliant API specifications for the HTTP endpoints (e.g. don't use GET for creating resources, use nouns and proper verbs for REST actions, etc.)
- Availability measurement - if you mention pure process healthchecks (like a health endpoint), then how would this endpoint be called? Explain that it's pull monitoring and on schedule. If the interviewer asks about non-process and functional healthcheck, explain how that would work. Usually for APIs, this is done via an API gateway which "pushes" the metric to an availability service.
- For the auditing requirement, ensure you mention about API gateway - i.e. it is a non functional requirement + considered as "boilerplate". However, if an API call fails due to a client error (ex: form validation error leading to 400 BAD REQUEST), then the audit event should not be generated. Also, this might bring up questions around eventual consistency - ensure you explain asynchronous messaging patterns
- For continuous monitoring, explain if you've used a solution like Dynatrace / NewRelic / Prometheus, etc.
- For the metering requirement, you could explain that this can be done via API gateway as well. However, customers must NOT be charged for API errors.


## Solutions

#### Approach 1

	Below are the write-heavy operations
		- Onboarding a new employee to the company
		- Associating a department to the employee
		- Changing the department of an employee
		- Offboarding an employee

	The last one is read-only operation
		- Showing all employees for a particular department

	The first approach would be to use only CQRS pattern within the same service (employee-service)

