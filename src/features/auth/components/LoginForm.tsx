import React from "react";
import { Button, Input } from "@/shared/ui";
import { t } from "@/shared/i18n";

export function LoginForm() {
  // TODO: wire up to auth/api.ts
  return (
    <form>
      <h1>{t("auth.login.title")}</h1>
      <Input type="email" name="email" placeholder="Email" />
      <Input type="password" name="password" placeholder="Password" />
      <Button type="submit">{t("auth.login.submit")}</Button>
    </form>
  );
}
