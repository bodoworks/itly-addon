import {
    UseMutationResult,
    UseQueryResult,
    useMutation,
    useQuery,
    useQueryClient,
} from "react-query";
import { browser } from "webextension-polyfill-ts";

import { SETTINGS_KEY, Settings } from "../../../services/storage";

const QUERY_SETTINGS = "QUERY_SETTINGS";

export function useSettings(): UseQueryResult<Settings, Error> {
    return useQuery(QUERY_SETTINGS, async () => {
        const results = await browser.storage.sync.get([SETTINGS_KEY]);
        const settings: Settings = results[SETTINGS_KEY];

        // TODO: validate that this is actually the shape that we expect
        return settings;
    });
}

export function useUpdateSettings(): UseMutationResult<void, Error, Settings> {
    const queryClient = useQueryClient();

    return useMutation(
        (settings: Settings): Promise<void> => {
            // TODO: validate that this is actually the shape that we expect
            return browser.storage.sync.set({ [SETTINGS_KEY]: settings });
        },
        {
            onSuccess: async () => {
                return queryClient.invalidateQueries(QUERY_SETTINGS);
            },
        }
    );
}
