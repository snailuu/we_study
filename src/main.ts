const mconsole = (function (
	$c: typeof document.createElement,
	$a: <T extends Node>(Sparent: Node, schild: T) => T,
	$body: Document['body'],
	$doc: Document,
) {
	function splitMessage(message: unknown): any[] {
		if (typeof message == 'string') {
			return message.split('\n');
		}
		if (typeof message === 'object') {
			return [JSON.stringify(message)];
		}
		return [message];
	}

	function ignoreStyle(style: string): string {
		const supportStyleProps =
			/((background|border|box-shadow|box-decoration-break|clear|float|color|cursor|display|font|line-height|margin|outline|padding|position|text-align|text-decoration|text-shadow|transform|transition|vertical-align|white-space).*?;)/g;
		let styleText = '';
		for (const [styleProp] of style.matchAll(supportStyleProps)) {
			styleText += styleProp;
		}
		return styleText;
	}

	function formatSplit(
		message: unknown,
		...args: unknown[]
	): { messages: string[]; style?: string }[] {
		if (typeof message === 'string' && message.includes('%c')) {
			const messages = message.split('%c');
			return ([] as { messages: string[]; style?: string }[]).concat(
				messages[0] ? { messages: splitMessage(messages[0]) } : [],
				messages.slice(1).map((message, index) => {
					return {
						messages: splitMessage(message),
						style: ignoreStyle(args[index] as string),
					};
				}),
			);
		}
		return [
			{ messages: splitMessage(message) },
			...args.map((item) => ({ messages: splitMessage(item) })),
		];
	}

	function $createMessage(messages: string[], style?: string) {
		let needEnter = false;
		return messages
			.map((message, idx) => {
				const $content = $c('div');
				$content.innerHTML = `${message}${idx === messages.length - 1 ? '' : ''}`;
				if (!message) {
					if (needEnter) {
						$content.dataset.ignore = 'true';
						needEnter = false;
					} else {
						needEnter = true;
					}
				}
				if (style) {
					$content.style.cssText = `${style}; width: fit-content;`;
				}
				if (idx) {
					$content.style.cssText += 'width: fit-content; overflow-wrap: anywhere;';
				} else {
					$content.style.cssText += 'display: inline-block;';
				}
				$content.style.cssText += `white-space: pre-wrap; word-break: break-all; ${
					message ? '' : 'height: 0;'
				}`;
				return $content;
			})
			.filter(($dom) => !$dom.dataset.ignore);
	}

	function messageHandler(...args: unknown[]) {
		const formatted = formatSplit(args[0], ...args.slice(1));
		return formatted.map(({ messages, style }) => {
			const $wrapper = $doc.createDocumentFragment();
			$createMessage(messages, style).forEach(($item) => $a($wrapper, $item));
			return $wrapper;
		});
	}

	function log(...args: unknown[]): void {
		const $div = $c('div');
		$div.style.cssText =
			'max-width: 600px; width: max-content; overflow-x: hidden; padding: 10px 0; font-family: monospace;';
		const $messages = messageHandler(...args);
		$messages.forEach(($item) => $a($div, $item));
		$a($body, $div);
	}

	return { log };
})(
	document.createElement.bind(document),
	(sparent, $child) => sparent.appendChild($child),
	document.body,
	document,
);
