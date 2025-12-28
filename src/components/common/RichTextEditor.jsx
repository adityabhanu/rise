import React, { forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Box, IconButton } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LinkIcon from "@mui/icons-material/Link";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";

const RichTextEditor = forwardRef(
  ({ initialContent = "<p></p>", minHeight = 150, customSX }, ref) => {
    const editor = useEditor({
      extensions: [StarterKit, Underline],
      content: initialContent,
    });

    useImperativeHandle(ref, () => ({
      getData: () => editor?.getHTML(),
      setData: (html) => editor?.commands.setContent(html),
      clear: () => editor?.commands.clearContent(),
    }));

    if (!editor) return null;

    const toggleMark = (type) =>
      editor.chain().focus()[`toggle${type}`]().run();

    return (
      <Box sx={{ ...customSX, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            border: "1px solid #ccc",
            borderBottom: "none",
            borderRadius: "8px 8px 0 0",
            background: "#f8f8f8",
            padding: "4px 4px 0 4px",
          }}
        >
          <IconButton
            size="small"
            onClick={() => toggleMark("Bold")}
            color={editor.isActive("bold") ? "primary" : "default"}
          >
            <FormatBoldIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => toggleMark("Italic")}
            color={editor.isActive("italic") ? "primary" : "default"}
          >
            <FormatItalicIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => toggleMark("Underline")}
            color={editor.isActive("underline") ? "primary" : "default"}
          >
            <FormatUnderlinedIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            color={editor.isActive("bulletList") ? "primary" : "default"}
          >
            <FormatListBulletedIcon fontSize="small" />
          </IconButton>

          <IconButton size="small">
            <LinkIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => toggleMark("Strike")}
            color={editor.isActive("strike") ? "primary" : "default"}
          >
            <StrikethroughSIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            border: "1px solid #ccc",
            borderRadius: "0 0 8px 8px",
            background: "white",
            minHeight,
            padding: 1,

            display: "flex",
            flexDirection: "column",

            "& .ProseMirror": {
              outline: "none",
              padding: 0,
              "& p,ul": {
                my: "4px",
              },
              minHeight: "100%",
              height: "100%",
              cursor: "text",
              flex: 1,
            },
          }}
        >
          <EditorContent
            editor={editor}
            style={{
              height: "100%",
              width: "100%",
              pointerEvents: "auto",
              flex: 1,
            }}
          />
        </Box>
      </Box>
    );
  }
);

export default RichTextEditor;
