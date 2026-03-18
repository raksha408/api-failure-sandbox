const express = require("express");
const router = express.Router();

const Api = require("../models/Api");
const authMiddleware = require("../middleware/authMiddleware");

/*
MOCK API EXECUTION
GET /api/apis/mock/:id
(MUST BE ABOVE "/:id")
*/
router.get("/mock/:id", async (req, res) => {
  try {
    const api = await Api.findById(req.params.id);

    if (!api) {
      return res.status(404).json({ msg: "API not found" });
    }

    let delay = api.delay || 0;

    if (api.randomDelayMax > 0) {
      delay =
        Math.floor(
          Math.random() * (api.randomDelayMax - api.randomDelayMin + 1)
        ) + api.randomDelayMin;
    }

    let shouldFail = false;

    if (api.failureRate > 0) {
      const random = Math.random() * 100;
      shouldFail = random < api.failureRate;
    }

    setTimeout(() => {
      if (api.isError || shouldFail) {
        return res.status(api.statusCode || 500).json({
          error: "Simulated failure"
        });
      }

      res.status(api.statusCode || 200).json(api.response || {});
    }, delay);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
CREATE NEW MOCK API
*/
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      endpoint,
      method,
      response,
      statusCode,
      delay,
      randomDelayMin,
      randomDelayMax,
      failureRate,
      isError
    } = req.body;

    const api = new Api({
      user: req.user.id,
      name,
      endpoint,
      method,
      response,
      statusCode,
      delay,
      randomDelayMin,
      randomDelayMax,
      failureRate,
      isError
    });

    await api.save();

    res.status(201).json(api);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
GET ALL APIS
*/
router.get("/", authMiddleware, async (req, res) => {
  try {
    const apis = await Api.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(apis);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
GET SINGLE API
*/
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const api = await Api.findById(req.params.id);

    if (!api) {
      return res.status(404).json({ msg: "API not found" });
    }

    // allow old APIs (no user)
    if (api.user && api.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    res.json(api);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
UPDATE API
*/
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const api = await Api.findById(req.params.id);

    if (!api) {
      return res.status(404).json({ msg: "API not found" });
    }

    // allow old APIs
    if (api.user && api.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const updatedApi = await Api.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedApi);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

/*
DELETE API
*/
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const api = await Api.findById(req.params.id);

    if (!api) {
      return res.status(404).json({ msg: "API not found" });
    }

    // ✅ FINAL FIX:
    // allow delete if user missing OR belongs to logged user
    if (api.user && api.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await api.deleteOne();

    res.json({ msg: "API deleted successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;