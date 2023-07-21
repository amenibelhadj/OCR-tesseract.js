# Tesseract OCR React App

This OCR (Optical Character Recognition) React App is specifically designed for recognizing text from Tunisian identity cards. It utilizes Tesseract.js to extract text from images of Tunisian ID cards, allowing users to easily digitize and analyze the textual information present on these cards. By focusing on Tunisian identity cards, the app can be tailored to handle the specific text patterns and structures commonly found on such documents, enhancing the accuracy and efficiency of the OCR process for this specific use case. Users can use this app to quickly extract relevant details like name, date of birth, and other important information from Tunisian ID cards.Let's explore each functionality in detail:

### Functionalities:

1. **Image Upload:**
   - Users can select an image file containing text by clicking on the file input button.
   - The selected image will be stored in the state variable `imageFile` for further processing.

2. **Text Recognition:**
   - The OCR process is triggered when the "Recognize Text" button is clicked.
   - The OCR recognition process is performed using the Tesseract.js library, which is an OCR engine running in the browser.
   - Tesseract.js supports multiple languages, and in this app, it's set to recognize Arabic text using the language code `'ara'`.
   - The OCR progress information is logged to the console for monitoring, using the provided `logger` function.

3. **Common OCR Error Correction:**
   - After the OCR process, the recognized text is extracted from the OCR result.
   - The `correctRecognizedText` function is applied to correct common OCR errors and improve the accuracy of the recognized text.
   - The corrections applied include:
     - Replacing common errors specified in the `commonErrors` object with their correct versions.
     - Removing characters that are not Arabic letters, Arabic numbers, or spaces.
     - Removing single Arabic digits (composed of a single digit).
     - Removing single Arabic letters (composed of a single letter).
     - Adding a line break before each specified term in the text for better readability.

4. **Displaying Recognized Text:**
   - The recognized text is displayed on the screen after the OCR process is complete.
   - The `displayRecognizedText` function formats the recognized text for display, splitting it into lines and adding line breaks between them.

5. **Loading Indicator:**
   - While the OCR process is in progress, a loading indicator is shown to inform the user that recognition is ongoing.
   - The button for "Recognize Text" is disabled during recognition to prevent multiple recognition requests.

### How to use the OCR App:

1. Clone or download this repository to your local machine.
2. Install the required dependencies using `npm install`.
3. Run the app using `npm start` to launch it in your browser.
4. Once the app is running, select an image containing Arabic text using the "Choose File" button.
5. Click the "Recognize Text" button to start the OCR process.
6. The recognized text will be displayed below the image after the OCR process is complete.
7. If needed, the displayed recognized text will be corrected for common OCR errors.

Please note that this app uses Tesseract.js to perform OCR in the browser, so it may have limitations on the complexity and quality of images it can handle. For best results, use clear images with well-defined Arabic text.
