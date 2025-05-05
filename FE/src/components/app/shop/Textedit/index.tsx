/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import { useEffect } from 'react';
import { RiBold, RiItalic, RiUnderline, RiH1, RiH2, RiListOrdered, RiListUnordered } from 'react-icons/ri';

interface TiptapProps {
	onChange?: (content: string) => void;
	initialContent?: string;
}

const MenuBar = ({ editor }: any) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="border-b p-2 flex flex-wrap gap-2">
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBold().run()}
				className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
			>
				<RiBold />
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleItalic().run()}
				className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
			>
				<RiItalic />
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
			>
				<RiUnderline />
			</button>

			{/* Headers */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				className={`p-2 rounded hover:bg-gray-100 ${
					editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''
				}`}
			>
				<RiH1 />
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				className={`p-2 rounded hover:bg-gray-100 ${
					editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''
				}`}
			>
				<RiH2 />
			</button>

			{/* Lists */}
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
			>
				<RiListUnordered />
			</button>
			<button
				type="button"
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				className={`p-2 rounded hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
			>
				<RiListOrdered />
			</button>
		</div>
	);
};

const Tiptap = ({ onChange, initialContent }: TiptapProps) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2],
				},
				// bulletList: {},
				// orderedList: {},
			}),
			BulletList.configure({
				HTMLAttributes: {
					class: 'list-disc pl-4',
				},
				keepMarks: true,
				keepAttributes: false,
				itemTypeName: 'listItem',
			}),
			Underline,
			ListItem,
		],
		content: initialContent,
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]',
			},
		},
	});
	useEffect(() => {
		if (editor && onChange) {
			editor.on('update', () => {
				onChange(editor.getHTML());
			});
		}
	}, [editor, onChange]);

	return (
		<div className="border rounded-lg overflow-hidden">
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
};

export default Tiptap;
