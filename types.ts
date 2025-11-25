export interface AIChatSettings {
	nodeLocation?: string;
	claudeLocation?: string;
	pythonPath?: string;
	terminalFontSize?: number;
	terminalFontFamily?: string;
	debugContext?: boolean;
}

export const DEFAULT_SETTINGS: AIChatSettings = {
	nodeLocation: '',
	claudeLocation: '',
	pythonPath: 'python3',
	terminalFontSize: 13,
	terminalFontFamily: 'Menlo, Monaco, "Courier New", monospace',
	debugContext: false
}
