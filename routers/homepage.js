const { Router } = require("express");
const router = new Router();
const Homepage = require("../models/").Homepage;
const user = require("../models/").user;
const Story = require("../models/").Story;
const authMiddleware = require("../auth/middleware");

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

router.patch("/:homepageId", authMiddleware, async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId);
    const { title, description, backgroundColor, color } = req.body;

    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else {
      (homepage.title = title), (homepage.description = description);
      homepage.backgroundColor = backgroundColor;
      homepage.color = color;

      const newHomepage = await homepage.save();
      console.log(newHomepage);
      res.json(newHomepage.dataValues);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:homepageId/stories", async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId, {
      include: [{ model: Story }, { model: user }],
    });
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else delete homepage.user.dataValues["password"];
    delete homepage.user.dataValues["email"];
    delete homepage.user.dataValues["id"];
    delete homepage.user.dataValues["createdAt"];
    delete homepage.user.dataValues["updatedAt"];
    res.json({ homepage: homepage });
  } catch (e) {
    next(e);
  }
});

router.post("/:homepageId/stories", authMiddleware, async (req, res, next) => {
  try {
    const homepageId = parseInt(req.params.homepageId);
    const homepage = await Homepage.findByPk(homepageId);
    const { name, content, imgUrl } = req.body;
    if (!name || !content) {
      res.status(400).send("missing parameters");
    }
    if (!homepage) {
      res.status(404).send("The homepage was not found");
    } else {
      const newStory = await Story.create({
        name,
        content,
        imgUrl,
        HomepageId: homepageId,
      });
      res.json(newStory);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
