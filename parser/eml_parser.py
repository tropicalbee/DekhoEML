import email
from email import policy
import os
import base64

def parse_eml(file_path: str) -> dict:
    try:
        with open(file_path, 'rb') as f:
            msg = email.message_from_binary_file(f, policy=policy.default)
            
        result = {
            "subject": msg.get("Subject", "No Subject"),
            "from": msg.get("From", "Unknown Sender"),
            "to": msg.get("To", "Unknown Recipient"),
            "date": msg.get("Date", "Unknown Date"),
            "body_html": None,
            "body_text": None,
            "attachments": []
        }

        for part in msg.walk():
            content_type = part.get_content_type()
            content_disposition = str(part.get("Content-Disposition", ""))

            # Handle attachments
            if "attachment" in content_disposition or part.get_filename():
                filename = part.get_filename()
                if filename:
                    payload = part.get_payload(decode=True)
                    if payload is not None:
                        # Encode raw binary bytes to an ASCII Base64 string
                        b64_data = base64.b64encode(payload).decode('ascii')
                        result["attachments"].append({
                            "filename": filename,
                            "mime_type": content_type,
                            "size": len(payload),
                            "data": b64_data
                        })
                continue

            # Handle body
            if content_type == "text/html":
                payload = part.get_payload(decode=True)
                charset = part.get_content_charset() or 'utf-8'
                result["body_html"] = payload.decode(charset, errors='replace')
            elif content_type == "text/plain":
                payload = part.get_payload(decode=True)
                charset = part.get_content_charset() or 'utf-8'
                result["body_text"] = payload.decode(charset, errors='replace')

        if not result["body_html"] and result["body_text"]:
            result["body_html"] = f"<pre>{result['body_text']}</pre>"

        return result
        
    except Exception as e:
        raise ValueError(f"Failed to parse EML file: {str(e)}")