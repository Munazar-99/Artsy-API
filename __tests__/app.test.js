// Import database functions
import { createNewPost, getAllPost } from "../mongodb/connection"; 

// Mock MongoDB connection functions
jest.mock("../mongodb/connection", () => ({
  createNewPost: jest.fn(),
  getAllPost: jest.fn(),
}));

describe("MongoDB Connection Functions", () => {
  // Cleanup after all tests are finished
  afterAll(() => {
    // Close the mocked MongoDB connection
    jest.clearAllMocks();
  });

  it("should create a new post", async () => {
    // Mock data for a new post
    const mockNewPostData = {
      postId: "mocked-post-id",
      name: "Test Name",
      prompt: "Test Prompt",
      photo: "mocked-photo-url",
    };

    // Mock the createNewPost function to return the mock data
    createNewPost.mockResolvedValueOnce(mockNewPostData);

    // Call the createNewPost function
    const newPost = await createNewPost("Test Name", "Test Prompt", {
      url: "mocked-photo-url",
    });

    // Check if the returned data matches the mock data
    expect(newPost).toEqual(mockNewPostData);
    // Check if the createNewPost function was called with the correct arguments
    expect(createNewPost).toHaveBeenCalledWith("Test Name", "Test Prompt", {
      url: "mocked-photo-url",
    });
  });

  it("should retrieve all posts", async () => {
    // Mock data for existing posts
    const mockPosts = [
      {
        postId: "post-id-1",
        name: "Name 1",
        prompt: "Prompt 1",
        photo: "photo-url-1",
      },
      {
        postId: "post-id-2",
        name: "Name 2",
        prompt: "Prompt 2",
        photo: "photo-url-2",
      },
    ];

    // Mock the getAllPost function to return the mock data
    getAllPost.mockResolvedValueOnce(mockPosts);

    // Call the getAllPost function
    const posts = await getAllPost();

    // Check if the returned data matches the mock data
    expect(posts).toEqual(mockPosts);
    // Check if the getAllPost function was called
    expect(getAllPost).toHaveBeenCalled();
  });
});
