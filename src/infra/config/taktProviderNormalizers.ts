import type {
  TaktProviderConfigEntry,
  TaktProvidersConfig,
} from '../../core/models/config-types.js';
import type { ProviderType } from '../../shared/types/provider.js';
import { validateProviderModelCompatibility } from './providerModelCompatibility.js';

type RawTaktAssistantProvider = {
  provider?: ProviderType;
  model?: string;
};

export function normalizeTaktProviders(raw: {
  assistant?: RawTaktAssistantProvider;
} | undefined): TaktProvidersConfig | undefined {
  if (!raw) {
    return undefined;
  }
  const normalizedAssistant = normalizeTaktAssistantProvider(raw.assistant);
  if (!normalizedAssistant) {
    return undefined;
  }
  return { assistant: normalizedAssistant };
}

function normalizeTaktAssistantProvider(
  assistant: RawTaktAssistantProvider | undefined,
): TaktProviderConfigEntry | undefined {
  if (!assistant) {
    return undefined;
  }
  const { provider, model } = assistant;
  if (provider === undefined && model === undefined) {
    throw new Error("Configuration error: 'takt_providers.assistant' must include provider or model.");
  }
  validateProviderModelCompatibility(
    provider,
    model,
    {
      modelFieldName: 'Configuration error: takt_providers.assistant.model',
    },
  );
  if (provider !== undefined) {
    return {
      provider,
      ...(model !== undefined ? { model } : {}),
    };
  }
  if (model === undefined) {
    throw new Error("Configuration error: 'takt_providers.assistant' must include provider or model.");
  }
  return { model };
}

export function buildRawTaktProvidersOrThrow(
  taktProviders: TaktProvidersConfig | undefined,
): { assistant: TaktProviderConfigEntry } | undefined {
  if (taktProviders === undefined) {
    return undefined;
  }
  if (taktProviders.assistant === undefined) {
    throw new Error("Configuration error: 'taktProviders.assistant' is required when taktProviders is set.");
  }
  const assistant = normalizeTaktAssistantProvider(taktProviders.assistant);
  if (!assistant) {
    throw new Error("Configuration error: 'takt_providers.assistant' must include provider or model.");
  }
  return { assistant };
}
