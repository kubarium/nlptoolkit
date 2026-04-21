# Install the App

```bash
npm install -g pnpm@latest-10
pnpm i
pnpm dev
```

# Linux Installation
```bash
sudo apt update && sudo apt upgrade -y 

#Ansible
sudo apt install -y ansible
mkdir -p ~/ansible
cd /home/gokhanercan/ansible
(copy the file)
ansible-playbook ansible.yml -K #K for interactive password.
docker --version #verify
```

# Prepare Docker Image (Local)
```bash
docker build -t nlptoolkit .    
docker run -p 3000:3000 nlptoolkit  # run in local (optional)
docker save -o nlptoolkit.tar nlptoolkit
```

# Install App
```bash
docker build -t nlptoolkit .
docker run -p 4536:4536 my-nlp-app
```

# Windows WSL Commands
Assuming distro name is: ``Ubuntu``

On Windows, point DNS to 8.8.8.8, TR providers block *.ubuntu.com fetches. 

(Optional) Set the root pass: 
Launch PowerShell as admin:
```bash
wsl -d Ubuntu -u root
passwd
```

```bash
wsl -d Ubuntu
```