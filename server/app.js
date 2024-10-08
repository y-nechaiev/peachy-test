const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { User, UserProfile } = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ include: 'profile' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/users', async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { name, email, age, address } = req.body;
    const user = await User.create({ name, email }, { transaction });
    const userProfile = await UserProfile.create({ age, address, userId: user.id }, { transaction });
    await transaction.commit();
    res.status(201).json({ user, profile: userProfile });
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ error: err.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const { name, email, age, address } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ name, email });
    const userProfile = await UserProfile.findOne({ where: { userId: user.id } });
    await userProfile.update({ age, address });
    res.json({ user, profile: userProfile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await UserProfile.destroy({ where: { userId: user.id } });
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});