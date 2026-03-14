/**
 * Создаёт publishable API key и выводит токен в консоль.
 * В минимальной сборке Medusa Admin нет раздела Developer / Publishable API Keys,
 * поэтому ключ удобно получить этим скриптом.
 *
 * Запуск: npm run get-publishable-key  (из папки backend)
 */

import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
} from "@medusajs/medusa/core-flows";

export default async function getPublishableKey({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);

  const [defaultChannel] = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultChannel) {
    logger.error("Default Sales Channel не найден. Сначала выполните: npm run seed");
    process.exit(1);
  }

  const {
    result: [key],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "Storefront",
          type: "publishable",
          created_by: "",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: key.id,
      add: [defaultChannel.id],
    },
  });

  const token = (key as { token?: string }).token;
  if (!token) {
    logger.error("Токен не возвращён. Проверьте версию Medusa.");
    process.exit(1);
  }

  console.log("\n--- Publishable API Key (один раз показывается при создании) ---");
  console.log(token);
  console.log("--- Скопируйте в frontend/.env как NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ---\n");
}
