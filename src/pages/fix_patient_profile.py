import sys

with open(r"d:\Deephysio_Clinic_18_03_2026\src\pages\PatientProfile.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

output = []
in_head = False
in_branch = False

for line in lines:
    if "<<<<<<< HEAD" in line:
        # If we encounter a HEAd, discard everything until =======
        in_head = True
        continue
    elif "=======" in line:
        # Flip to branch mode
        in_head = False
        in_branch = True
        continue
    elif ">>>>>>>" in line:
        # Exit branch mode
        in_branch = False
        continue
    
    if in_head:
        # Discard everything from HEAD
        continue
    elif in_branch:
        output.append(line)
    else:
        output.append(line)

with open(r"d:\Deephysio_Clinic_18_03_2026\src\pages\PatientProfile_resolved.jsx", "w", encoding="utf-8") as f:
    f.writelines(output)

print("Resolution script completed for patient profile.")
