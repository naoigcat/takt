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

type NormalizableTaktAssistantProvider =
  | (RawTaktAssistantProvider & { provider: ProviderType })
  | (RawTaktAssistantProvider & { model: string });

export function normalizeTaktProviders(raw: {
  assistant?: RawTaktAssistantProvider;
} | undefined): TaktProvidersConfig | undefined {
  if (!raw) {
    return undefined;
  }
  if (raw.assistant === undefined) {
    return undefined;
  }
  const assistant = normalizeTaktAssistantProvider(raw.assistant);
  return { assistant: assistant };
}

function normalizeTaktAssistantProvider(
  assistant: RawTaktAssistantProvider,
): TaktProviderConfigEntry {
  assertNormalizableTaktAssistantProvider(assistant);
  const { provider, model } = assistant;
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
  return { model };
}

function assertNormalizableTaktAssistantProvider(
  assistant: RawTaktAssistantProvider,
): asserts assistant is NormalizableTaktAssistantProvider {
  if (assistant.provider !== undefined || assistant.model !== undefined) {
    return;
  }

  throw new Error("Configuration error: 'takt_providers.assistant' must include provider or model.");
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
  return { assistant };
}
