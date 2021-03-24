/**
 * Copyright (C) 2021 Marvin Schopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @license Apache-2.0
 * @copyright 2021 Marvin Schopf
 * @author Marvin Schopf <marvin@schopf.biz>
 *
 */

import fetch from "node-fetch";

export type ThreatType =
	| "THREAT_TYPE_UNSPECIFIED"
	| "MALWARE"
	| "SOCIAL_ENGINEERING"
	| "UNWANTED_SOFTWARE"
	| "POTENTIALLY_HARMFUL_APPLICATION";

export type Match = {
	threatType: ThreatType;
	platformType: string;
	threat: {
		url: string;
	};
	cacheDuration: string;
	threatEntryType: string;
};

async function asyncForEach(array: Array<any>, callback: Function) {
	for (let index: number = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

export class GoogleSafeBrowsingClient {
	apiKey: string;
	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async lookupUrl(
		domains: string | string[],
		options?: {
			threatTypes?: ThreatType[];
		}
	): Promise<Match[]> {
		let _domains: { url: string }[] = [];
		if (typeof domains === "string") {
			_domains[0] = { url: domains };
		} else {
			await asyncForEach(domains, (domain: string) => {
				_domains.push({
					url: domain,
				});
			});
		}
		let threatTypes: ThreatType[] = [
			"THREAT_TYPE_UNSPECIFIED",
			"MALWARE",
			"POTENTIALLY_HARMFUL_APPLICATION",
			"SOCIAL_ENGINEERING",
			"UNWANTED_SOFTWARE",
		];
		if (options && options.threatTypes) {
			threatTypes = options.threatTypes;
		}
		let requestBody: string = JSON.stringify({
			client: this._getClientInfo(),
			threatInfo: {
				threatEntryTypes: ["URL"],
				platformTypes: ["ANY_PLATFORM"],
				threatTypes: threatTypes,
				threatEntries: _domains,
			},
		});
		const response = await fetch(
			`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${this.apiKey}`,
			{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: requestBody,
			}
		);
		if (response.status === 200) {
			const responseJson = await response.json();
			if (responseJson.matches) {
				const matches: Match[] = responseJson.matches;
				return matches;
			} else {
				return [];
			}
		} else
			throw new Error(
				`Google Safe Browsing: ${
					response.status
				}: ${await response.text()}`
			);
	}

	public async isUrlSafe(url: string): Promise<boolean> {
		return (await this.lookupUrl(url)).length === 0;
	}

	private _getClientInfo(): { clientId: string; clientVersion: string } {
		return {
			clientId: "marvinschopf/google-safe-browsing",
			clientVersion: "1.0.0",
		};
	}
}

export default GoogleSafeBrowsingClient;
