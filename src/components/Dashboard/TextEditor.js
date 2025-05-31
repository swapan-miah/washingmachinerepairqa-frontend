"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ value, onChange }) => {
	const editorRef = useRef(null);

	const editorConfig = {
		readonly: false,
		toolbar: true,
		spellcheck: true,
		language: "en",
		toolbarButtonSize: "medium",
		toolbarAdaptive: false,
		showCharsCounter: false,
		showWordsCounter: false,
		showXPathInStatusbar: false,
		showStatusbar: false,
		showPoweredBy: false,
		askBeforePasteHTML: true,
		askBeforePasteFromWord: true,
		resizer: true,
		buttons: [
			"undo",
			"redo",
			"|",
			"bold",
			"strikethrough",
			"underline",
			"italic",
			"|",
			"superscript",
			"subscript",
			"|",
			"align",
			"|",
			"ul",
			"ol",
			"outdent",
			"indent",
			"|",
			"font",
			"fontsize",
			"brush",
			"paragraph",
			"|",
			"image",
			"link",
			"table",
			"|",
			"hr",
			"eraser",
			"copyformat",
			"|",
			"fullsize",
			"selectall",
			"print",
			"|",
			"source",
		],
		uploader: {
			insertImageAsBase64URI: true,
		},
		width: "100%",
		height: "auto",
	};

	return (
		<>
			<JoditEditor
				ref={editorRef}
				value={value}
				config={editorConfig}
				onBlur={(newContent) => onChange(newContent)}
			/>
		</>
	);
};

export default TextEditor;
