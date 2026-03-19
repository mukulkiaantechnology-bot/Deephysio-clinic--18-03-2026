import sys

with open(r"d:\Deephysio_Clinic_18_03_2026\src\pages\ClinicalNotes.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

output = []
in_head = False
in_branch = False

for line in lines:
    # Special clause for overlapping blocks or single dividers
    if "<<<<<<< HEAD" in line:
        in_head = True
        continue
    elif "=======" in line:
        in_head = False
        in_branch = True
        continue
    elif ">>>>>>>" in line:
        in_branch = False
        continue
    
    if in_head:
        # Discard HEAD (since we mostly want Branch layouts)
        continue
    elif in_branch:
        output.append(line)
    else:
        output.append(line)

with open(r"d:\Deephysio_Clinic_18_03_2026\src\pages\ClinicalNotes_resolved.jsx", "w", encoding="utf-8") as f:
    f.writelines(output)

print("Resolution script completed.")
