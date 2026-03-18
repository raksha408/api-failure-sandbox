const Api = require("../models/Api");

exports.createApi = async (req, res) => {
  const api = await Api.create({
    ...req.body,
    user: req.user
  });
  res.json(api);
};

exports.getApis = async (req, res) => {
  const apis = await Api.find({ user: req.user });
  res.json(apis);
};

// 🔥 CORE: SIMULATION ENGINE
exports.hitApi = async (req, res) => {
  const api = await Api.findById(req.params.id);

  if (!api) return res.status(404).json({ msg: "Not found" });

  setTimeout(() => {
    if (api.isError) {
      return res.status(api.statusCode || 500).json({
        error: "Simulated failure"
      });
    } else {
      return res.status(api.statusCode || 200).json(api.response);
    }
  }, api.delay || 0);
};