const { Router } = require("express");
const router = new Router();
const Homepage = require("../models/").Homepage;
const Story = require("../models/").Story;

router.get("/", async (req, res, next) => {
  try {
    const limit = Math.min(req.query.limit || 25, 500);
    const offset = req.query.offset || 0;

    Homepage.findAndCountAll({ limit, offset }).then((result) =>
      res.send({ homepages: result.rows, total: result.count })
    );
  } catch (e) {
    next(e);
  }
});

router.get("/:homepageId", async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId);
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else res.json(homepage);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title, description, backgroundColor, color, userId } = req.body;
    if (!title || !userId) {
      res.status(400).send("missing parameters");
    } else {
      const newHomepage = await Homepage.create({
        title,
        description,
        backgroundColor,
        color,
        userId,
      });
      res.json(newHomepage);
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:homepageId", async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId);
    const { description, backgroundColor, color } = req.body;
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else {
      const newHomepage = await Homepage.update(
        {
          description,
          backgroundColor,
          color,
        },
        { where: { id: homepageId } }
      );
      res.json(newHomepage);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:homepageId/stories", async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId, { include: [Story] });
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else res.json(homepage);
  } catch (e) {
    next(e);
  }
});

router.post("/:homepageId/stories", async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId);
    const { name, content, imgUrl } = req.body;
    if (!name || !content) {
      res.status(400).send("missing parameters");
    }
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else
      const newStory = await Story.create({
        name,
        content,
        imgUrl,
        HomepageId: homepageId,
      });
    res.json(newHomepage);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
