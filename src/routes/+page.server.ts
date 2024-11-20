import { signInSchema } from "$lib/schema";
import { db } from "$lib/server/db";
import { dataTable } from "$lib/server/db/schema";
import type { Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
export const load = async () => {
  const form = superValidate(zod(signInSchema));
  return { form };
};

export const actions: Actions = {
  sign: async (event) => {
    const form = await superValidate(event, zod(signInSchema));

    const response = await db.insert(dataTable).values({
      email: form.data.email,
      password: form.data.password,
    });

    console.log(response);
    return { form };
  },
};
