import { Model } from "survey-core";

export const surveyHandler = (survey: Model, completeForm: boolean) => {
  const tempFileStorage: { [key: string]: File[] } = {};

  // Handles selected files
  survey.onUploadFiles.add((_, options) => {
    // Add files to the temporary storage
    if (tempFileStorage[options.name] !== undefined) {
      tempFileStorage[options.name] = tempFileStorage[options.name].concat(
        options.files
      );
    } else {
      tempFileStorage[options.name] = options.files;
    }

    // Load file previews
    const content: {
      name: string;
      type: string;
      content: string | ArrayBuffer | null;
      file: File;
    }[] = [];

    options.files.forEach((file: File) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        content.push({
          name: file.name,
          type: file.type,
          content: fileReader.result,
          file: file,
        });
        if (content.length === options.files.length) {
          // Return a file for preview as a { file, content } object
          options.callback(
            content.map((fileContent) => {
              return {
                file: fileContent.file,
                content: fileContent.content,
              };
            })
          );
        }
      };
      fileReader.readAsDataURL(file);
    });
  });

  // Handles file removal
  survey.onClearFiles.add((_, options) => {
    // Empty the temporary file storage if "Clear All" is clicked
    if (options.fileName === null) {
      tempFileStorage[options.name] = [];
      options.callback("success");
      return;
    }

    // Remove an individual file
    const tempFiles = tempFileStorage[options.name];
    if (!!tempFiles) {
      const fileInfoToRemove = tempFiles.filter(
        (file) => file.name === options.fileName
      )[0];
      if (fileInfoToRemove) {
        const index = tempFiles.indexOf(fileInfoToRemove);
        tempFiles.splice(index, 1);
      }
    }
    options.callback("success");
  });

  if (!completeForm) return;

  survey.onComplete.add((result) => {
    // `tempFileStorage` keys are question names
    const questionsToUpload = Object.keys(tempFileStorage);

    if (questionsToUpload.length === 0) {
      return;
    }
    for (let i = 0; i < questionsToUpload.length; i++) {
      const questionName = questionsToUpload[i];
      const question = survey.getQuestionByName(questionName);
      const filesToUpload = tempFileStorage[questionName];

      const formData = new FormData();
      filesToUpload.forEach((file) => {
        formData.append(file.name, file);
      });

      fetch("/api/survey/fileUpload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
};
