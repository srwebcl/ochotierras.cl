import subprocess
import os

def run(cmd):
    print(f"Running: {cmd}")
    subprocess.check_call(cmd, shell=True)

# Get untracked files
output = subprocess.check_output("git ls-files --others --exclude-standard", shell=True).decode('utf-8')
files = [f for f in output.splitlines() if f.endswith('.webp')]

BATCH_SIZE = 20
total = len(files)
print(f"Found {total} WebP files to push.")

for i in range(0, total, BATCH_SIZE):
    batch = files[i:i+BATCH_SIZE]
    print(f"Processing batch {i//BATCH_SIZE + 1} ({len(batch)} files)...")
    
    # Add files
    run(f"git add {' '.join(batch)}")
    
    # Commit
    run(f'git commit -m "Add optimized images batch {i//BATCH_SIZE + 1}"')
    
    # Push
    try:
        run("git push")
    except subprocess.CalledProcessError:
        print("Push failed! Retrying once...")
        run("git push")

print("All batches processed.")
