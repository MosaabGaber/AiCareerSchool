import re

with open('src/components/CheckoutPage.tsx', 'r') as f:
    content = f.read()

# 1. Rename component
content = content.replace('export function CheckoutPage() {', 'export function CheckoutPageRealEstate() {')

# 2. Change displayed prices
content = content.replace('1,200', '1,500')

# 3. Change event values
content = content.replace('value: 1200', 'value: 1500')

# 4. Add amount: 150000 to fetch body
content = content.replace('''        body: JSON.stringify({
          name: fullName,
          email,
        }),''', '''        body: JSON.stringify({
          name: fullName,
          email,
          amount: 150000,
        }),''')

with open('src/components/CheckoutPageRealEstate.tsx', 'w') as f:
    f.write(content)
