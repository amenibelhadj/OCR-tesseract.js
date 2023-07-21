import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const OCRApp = () => {
  const [imageFile, setImageFile] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const commonErrors = {
    'ا الجموو به':'الجمهورية',
    'التوسية':'التونسية',
    'ا كع طاقة':'بطاقة',
    'الوطية': 'الوطنية',
    'الوطتية': 'الوطنية',
    'آل 4 جه تب':' اللقب',
    'بتالحاج':'بالحاج',
    'بحمال':'جمال',
    'ين':'بن',
    'هن':'بن',
    'ا امل ا تايزاوبادة':'تاريخ الولادة',
    '0500':'',
    'انقب':'اللقب',
    'تزكات':'بركات',
    ' 1 ب':'',
    'اللسيم':'الإسم',
    ' نت':' بنت',
    'ضنت':'بنت',
    'الهمبد':'عبد',
    'الحملد':'الحميد',
    ' شم اليالولادة':'تاريخ الولادة',
    '169':'1969',
    '0 ِ! ضَْنت':'بنت',
    ' ميد ':' محمد ',
    'هيا آ بر <حفقة':'مكانها ',
    'الا ارعاقة 0 دا':'اريانة',
    'الوطّتية':'الوطنية',
    'باه':'بطاقة',
    'لون لت':'الوطنية',
    'جت منت':'بنت',
    'اجمال':'جمال',
    'مكمي':'محمد',
    'عا تاي':'تاريخ',
    '1 نب':'',
    'عائبا':'مكانها',
    'تيسن الا':'تونس',
    'مج':'مكانها تونس',
    'اق ونراأنم .. ':'',
    'ع |':'',
    ' . ال':'',
    '00-7 ':'  ',

  };

  // Function to correct recognized text
  const correctRecognizedText = (recognizedText) => {
    // Store the original recognized text in a variable
    let correctedText = recognizedText;

    // Loop through the commonErrors object and apply the corrections
    for (const error in commonErrors) {
      // Create a regular expression using the error as the pattern, 'g' flag for global search
      const regex = new RegExp(error, 'g');
      // Replace all occurrences of the error with its corresponding correction
      correctedText = correctedText.replace(regex, commonErrors[error]);
    }

    // Remove all characters except Arabic letters, Arabic numbers, and spaces
    correctedText = correctedText.replace(/[^\u0621-\u064A0-9\s]/g, '');

    // Remove single Arabic digits (composed of a single digit)
    correctedText = correctedText.replace(/\b\d\b/g, '');

    // Remove single Arabic letters (composed of a single letter)
    correctedText = correctedText.replace(/\b[\u0621-\u064A]\b/g, '');

    // Add a line break before each specified term in the text
    const terms = [
      'الجمهورية التونسية',
      'بطاقة التعريف الوطنية',
      'اللقب',
      'الاسم',
      'تاريخ الولادة',
      'مكانها',
    ];

    terms.forEach((term) => {
      correctedText = correctedText.replace(term, `\n${term}`);
    });

    // Remove any extra line breaks at the beginning of the text
    correctedText = correctedText.replace(/^\n/, '');

    // Return the corrected text
    return correctedText;
  };


  // Function to handle image upload event
  const handleImageUpload = (event) => {
    // Get the selected image file from the event
    const file = event.target.files[0];

    // Set the selected image file to a state variable (e.g., setImageFile) for further use
    setImageFile(file);
  };


  const displayRecognizedText = (recognizedText) => {
    const lines = recognizedText.split(/\n/);
    return lines.map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>);
  };

  // Fonction pour effectuer la reconnaissance de texte
  const handleRecognition = async () => {
    if (!imageFile) return;

    setIsLoading(true);

    try {
      const result = await Tesseract.recognize(
          imageFile,
          'ara',
          { logger: info => console.log(info) } // Affiche les informations de progression dans la console.
      );

      const cleanedText = result.data.text.replace(/\s+/g, ' ');

      // Applique la correction des erreurs courantes
      const correctedText = correctRecognizedText(cleanedText);

      setRecognizedText(correctedText);
    } catch (error) {
      console.error('Erreur lors de la reconnaissance de texte :', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
        <h1 style={{ fontSize: '24px' }}>OCR App - Text Recognition</h1>
        <div>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          <button onClick={handleRecognition} disabled={!imageFile || isLoading}>
            {isLoading ? 'Recognition in progress...' : 'Recognize Text'}
          </button>
        </div>
        {imageFile && (
            <div>
              <h2>Selected Image:</h2>
              <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Selected Image"
                  style={{ width: '40%', height: 'auto' }}
              />
            </div>
        )}
        {recognizedText && (
            <div>
              <h2>Recognized Text:</h2>
              <div style={{ fontSize: '25px' }}>
                {displayRecognizedText(correctRecognizedText(recognizedText))}
              </div>
            </div>
        )}
      </div>
  );
};
export default OCRApp;
