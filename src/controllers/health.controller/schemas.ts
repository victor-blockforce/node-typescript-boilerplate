import * as yup from 'yup';

export const HealthSchema = {
  querystring: yup.object({
    testArg: yup.string(),
  })
};
