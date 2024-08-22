import Comment from "./Comment";
import { Box, Divider, Text } from "@mantine/core";
import { IComment } from "@utilities/interfaces/PublicInterfce";
function CommentList({ comments }: { comments: IComment[] }) {
  const now = new Date();
  const formattedDate = now.toLocaleDateString();
  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      {comments.map((comment) => {
        return (
          <Box key={comment.id}>
            <Box display={"flex"} style={{ alignItems: "center", gap: "5px" }}>
              <Box
                display={"flex"}
                bg={"yellow"}
                style={{
                  borderRadius: "100px",
                  justifyContent: "center",
                  overflow: "hidden",
                }}>
                <img
                  src={comment?.user?.fileUploads?.url}
                  alt="your img"
                  width={"50px"}
                  height={"50px"}
                />
              </Box>
              <Box>
                <Text fz={13} fw={500}>
                  {comment?.user?.firstName + " " + comment?.user?.lastName}
                </Text>
                <Text fz={13} fw={300}>
                  <span style={{ margin: "5px" }}> {formattedDate}</span>
                  <span style={{ margin: "5px" }}> {formattedTime}</span>
                </Text>
              </Box>
            </Box>
            <Box mt={15} mr={10} fz={15} fw={500}>
              <Comment comment={comment} />
            </Box>
            <Divider my={10} />
          </Box>
        );
      })}
    </>
  );
}

export default CommentList;
