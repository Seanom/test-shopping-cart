export const httpGet = (fullPath: string) => req(fullPath, 'GET');

const req = async (
	fullPath: string,
	method?: string,
	payload?: any
): Promise<{ ok: boolean; data: any }> => {
	const res = await fetch(fullPath, {
		method: method || 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body: payload && JSON.stringify(payload)
	});
	const json = await res.json();
	return { ok: res.ok, data: json };
};
