import subprocess

if __name__ == '__main__':
    print("Running npm build...")
    subprocess.run("cd app && npm run build", shell=True, check=True)
    print("Stashing build...")
    subprocess.run("git add app/dist", shell=True, check=True)
