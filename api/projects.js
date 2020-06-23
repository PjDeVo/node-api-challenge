const express = require("express");
const router = express.Router();
const projectHelpers = require("../data/helpers/projectModel.js");


router.get("/", async (req, res) => {
  try {
    const projects = await projectHelpers.get();

    res.status(200).json(projects);

    if (!projects) {
      res.status(400).json({ message: " No Projects" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id/actions', async (req,res)=> {
  const {id} = req.params;

  const projectActions = await projectHelpers.getProjectActions(id);
  res.status(200).json(projectActions)

})
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const wantedProject = await projectHelpers.get(id);

    if (!wantedProject) {
      res.status(400).json({ message: "No Project With That ID" });
    }

    res.status(200).json(wantedProject);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const project = req.body;
  try {
    await projectHelpers.insert(project);
    res.status(200).json(project);

    if (!project) {
      res.status(400).json({
        message: "please supply a name, description, and completed status",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put('/:id', async (req,res)=> {
    const {id} = req.params;
    const changes = req.body;

    try {
        await projectHelpers.update(id, changes);
        res.status(200).json(changes)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  

  try {
    await projectHelpers.remove(id);
    res.status(200).json({message: `Project Id ${id} removed`});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
