const express = require("express");
const router = express.Router();
const actionHelpers = require('../data/helpers/actionModel.js')

router.get("/", async (req, res) => {
    try {
      const actions = await actionHelpers.get();
  
      res.status(200).json(actions);
  
      if (!actions) {
        res.status(400).json({ message: " No actions" });
      }
    } catch (error) {
      console.log(error);
    }
  });

  router.get('/:id', async (req,res) => {
      const {id} = req.params;
      
      try {
          if(!id) {
              res.status(400)
          }
          const action = await actionHelpers.get(id)
          res.status(200).json(action)
      } catch (error) {
          res.status(500).json(error)
      }
  })

  router.post('/:id', async (req,res)=> {
    const action = {project_id: req.params.id, ...req.body} 
      try {
        const addedAction = await actionHelpers.insert(action);
        res.status(200).json(action)
         
      } catch (error) {
          res.status(500).json(error)
      }


  })

  router.put('/:id', async (req,res)=> {
      const {id} = req.params;
     const changes = req.body
      try {
          const update  = await actionHelpers.update(id,changes);
          res.status(200).json(changes)
      } catch (error) {
          res.status(500).json(error)
      }
  })

  router.delete('/:id', async (req,res)=> {
      const {id} = req.params;
       
      try {
          await actionHelpers.remove(id);
          res.status(200).json(actionHelpers.get())
      } catch (error) {
          res.status(500).json(error)
      }
  })

  module.exports = router;