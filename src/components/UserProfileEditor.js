import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/userStore";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { cyrb53 } from "../utils/hash";

const UserProfileEditor = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { userData, setUserData } = useUserStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    setFirstName(userData.firstName);
    setLastName(userData.lastName);
    setEmail(userData.email);
  }, [userData]);

  function onSaveChanges() {
    setSuccess(null);

    if (!firstName || !lastName || !email) {
      setError("Заполните все обазательные поля");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Неверный формат почты");
      return;
    }
    if (newPassword || repeatPassword) {
      if (newPassword.length < 6) {
        setError("Пароль должен содержать не менее 6 символов");
        return;
      }
      if (newPassword !== repeatPassword) {
        setError("Пароли не совпадают");
        return;
      }
    }

    setUserData({
      firstName,
      lastName,
      email,
    });

    if (newPassword) {
      setUserData({ hashedPassword: cyrb53(newPassword, 123) });
    }

    setSuccess("Изменения сохранены");
    setError(null);
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Stack
        spacing={2}
        direction="column"
        width="100%"
        className="bg-gray-50 rounded-xl p-5"
      >
        <Typography variant="h5">Редактирование профиля</Typography>
        <TextField
          fullWidth
          label="Имя"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Фамилия"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Stack spacing={2} direction="column" width="100%">
          <Typography variant="h7">Установка нового пароля</Typography>
          <TextField
            fullWidth
            label="Новый пароль"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            label="Повторите пароль"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </Stack>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">Изменения сохранены</Alert>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={onSaveChanges}
        >
          Сохранить изменения
        </Button>
      </Stack>
    </Box>
  );
};
export default UserProfileEditor;
