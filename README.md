\# HireFit – Skill-Based Placement Portal



HireFit is a full-stack web application designed to connect students with relevant job opportunities based on their skills and help recruiters manage job postings and applications.



\## Features



\- \*\*User Authentication:\*\* Login and registration with JWT-based authentication.

\- \*\*Student Profiles:\*\* Manage student information and skills.

\- \*\*Job Listings:\*\* Browse available job opportunities.

\- \*\*Skill-Based Matching:\*\* Help students discover relevant opportunities based on their skills.

\- \*\*Job Applications:\*\* Apply for jobs and manage application information.

\- \*\*Recruiter Dashboard:\*\* Manage job postings and review applications.



\## Technology Stack



\- \*\*Frontend:\*\* React.js

\- \*\*Backend:\*\* Django REST Framework

\- \*\*Database:\*\* MySQL

\- \*\*Authentication:\*\* JSON Web Tokens (JWT)

\- \*\*API Testing:\*\* Postman

\- \*\*Version Control:\*\* Git and GitHub



\## Project Structure



```text

HireFit/

├── backend/       # Django REST API

├── frontend/      # React application

├── postman/       # API testing resources

├── .gitignore

└── README.md

```



\## Getting Started



\### Prerequisites



Install the following tools:



\- Python

\- Node.js and npm

\- MySQL Server

\- Git



\### 1. Clone the Repository



```bash

git clone https://github.com/aryadeshmukh105/HireFit.git

cd HireFit

```



\### 2. Set Up the Backend



```bash

cd backend

python -m venv venv

```



Activate the virtual environment on Windows:



```powershell

.\\venv\\Scripts\\Activate.ps1

```



Install the required dependencies:



```bash

pip install -r requirements.txt

```



Configure your local environment variables and MySQL database according to your Django settings.



Apply migrations and start the server:



```bash

python manage.py migrate

python manage.py runserver

```



\### 3. Set Up the Frontend



Open a new terminal in the project root:



```bash

cd frontend

npm install

npm run dev

```



If your frontend uses a different development setup, follow the scripts defined in `frontend/package.json`.



\## Future Enhancements



\- Advanced job filtering and search

\- Resume upload and profile improvements

\- Application status notifications

\- Enhanced recruiter analytics



\## Author



\*\*Arya Deshmukh\*\*



GitHub: \[aryadeshmukh105](https://github.com/aryadeshmukh105)



\---



This project was developed as part of my full-stack web development learning journey.



