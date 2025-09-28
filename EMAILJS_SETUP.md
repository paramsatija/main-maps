# EmailJS Setup Guide for MAPS International Contact Forms

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (`info@mapsinternational.net`)
5. Copy the **Service ID** (it will look like `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

**Subject:** New {{form_type}} Inquiry from MAPS International Website

**Template Body:**
```
New {{form_type}} inquiry received from MAPS International website:

CONTACT INFORMATION:
Name: {{name}}
Email: {{email}}
Phone: {{phone}}
Organization: {{organization}}
Website: {{website}}

FORM DETAILS:
Form Type: {{form_type}}
Message: {{message}}

ADDITIONAL INFORMATION:
Timeline: {{timeline}}
Budget: {{budget}}
Type: {{type}}
Experience: {{experience}}
Age: {{age}}
School: {{school}}
Interest: {{interest}}
Availability: {{availability}}
Art Style: {{art_style}}
Medium: {{medium}}
Outlet: {{outlet}}
Article Type: {{article_type}}
Deadline: {{deadline}}
Target Audience: {{target_audience}}
Inquiry Type: {{inquiry_type}}

FILES:
Files Count: {{files_count}}
Files Info: {{files_info}}

---
This email was sent from the MAPS International contact form.
Reply directly to this email to respond to {{reply_to}}
```

4. Save the template and copy the **Template ID** (it will look like `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (it will look like `xxxxxxxxxxxxxxxx`)

### Step 5: Update Configuration
1. Open `src/pages/Connect.tsx`
2. Find these lines (around line 10-12):
```javascript
const EMAILJS_SERVICE_ID = 'service_maps_international'; // Replace with your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_contact_form'; // Replace with your actual template ID
const EMAILJS_PUBLIC_KEY = 'your_public_key_here'; // Replace with your actual public key
```

3. Replace with your actual values:
```javascript
const EMAILJS_SERVICE_ID = 'service_xxxxxxxxx'; // Your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxxx'; // Your actual template ID
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxxxx'; // Your actual public key
```

### Step 6: Test the Forms
1. Run your development server: `npm run dev`
2. Go to the Contact page
3. Fill out any form and submit
4. Check your email (`info@mapsinternational.net`) for the submission

## ✅ That's It!

Your contact forms will now send emails directly to `info@mapsinternational.net` with all the form data included.

## 🔧 Troubleshooting

- **"EmailJS Error"**: Check that your Service ID, Template ID, and Public Key are correct
- **No emails received**: Check your spam folder
- **Template variables not working**: Make sure the template uses the exact variable names from the code

## 📧 Email Features

- ✅ All form data included in email
- ✅ File information (names and sizes)
- ✅ Form type identification
- ✅ Reply-to set to sender's email
- ✅ Professional formatting
- ✅ Error handling with user feedback

## 🚀 Production Notes

- The free EmailJS plan allows 200 emails/month
- For higher volume, consider upgrading to a paid plan
- All emails are sent from your connected email account
- File attachments are not included in emails (only file info), but you can upgrade to handle actual file attachments
