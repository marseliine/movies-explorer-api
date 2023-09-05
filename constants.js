const constants = {
  okMessage: 'Действие выполнено.',
  badDataError: 'Переданы некорректные данные.',
  defaultError: 'Ошибка по умолчанию.',
  notFoundError: 'Данные по указанному _id не найдены.',
  UnauthorizedError: 'Неправильные почта или пароль.',
  ForbiddenError: 'Введены некорректные данные.',
  ConflictError: 'Пользователь с таким email уже существует.',
};

module.exports = Object.freeze(constants);
