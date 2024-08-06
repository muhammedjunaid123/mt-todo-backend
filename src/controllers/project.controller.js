import {
  createNewProjectRepo,
  getProjectRepo,
  updateProjectRepo,
  userProjectRepo,
} from "../repositories/project.repository.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";
import axios from "axios";
import { log } from "console";
import path from "path";
import { projectModel } from "../models/project.model.js";

const createNewProject = asyncHandler(async (req, res) => {
  const data = await createNewProjectRepo(req);
  if (data) {
    res.status(201).json(new apiResponse(201,data));
  }
});
const updateProject = asyncHandler(async (req, res) => {
  const data = await updateProjectRepo(req.body);
  if (data) {
    res.status(200).json(new apiResponse(200));
  }
});
const userProject = asyncHandler(async (req, res) => {
  const data = await userProjectRepo(req);
  if (data) {
    res.status(200).json(new apiResponse(200, data));
  }
});
const getProject = asyncHandler(async (req, res) => {
  const data = await getProjectRepo(req.query["id"]);
  if (data) {
    res.status(200).json(new apiResponse(200, data));
  }
});
const exportGist = asyncHandler(async (req, res) => {
  const ProjectId = req.query.id;
  let data = await getProjectRepo(ProjectId);
  data = data[0];

  const publicDir = path.join("src", "public", "files");
  const filePath = path.join(publicDir, `${data["Title"]}.md`);

  let todoData = data["ListTodos"];

  let pendingList = ``;
  let CompletedList = ``;
  let countCompleted = 0;

  todoData.forEach((element) => {
    if (element["Status"] == true) {
      countCompleted++;
      CompletedList += `- [x] ${element["Description"]}\n`;
    } else {
      pendingList += `- [ ] ${element["Description"]}\n`;
    }
  });

  const text = `# ${data["Title"]}

 **Summary**: ${countCompleted + "/" + todoData.length} Todos Completed 

# Pending 
${pendingList}

# Completed 
${CompletedList}
`;

  fs.writeFile(filePath, text, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
  });

  const gistData = {
    description: "Project Summary with Tasks",
    public: false,
    files: {
      [`${data["Title"]}.md`]: {
        content: text,
      },
    },
  };
  const response = await axios.post("https://api.github.com/gists", gistData, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });
  res.json({ url: response.data.html_url });
});
export { createNewProject, updateProject, userProject, getProject, exportGist };
