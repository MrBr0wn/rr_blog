import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import AppRoutes from "./AppRoutes"

jest.mock("../features/posts/PostsList", () => {
  const MockPostsList = () => (
    <div>YOur Matcher for PostsList component here</div>
  )
  return MockPostsList
})

jest.mock("../features/posts/PostDetails", () => {
  const MockPostDetails = () => (
    <div>YOur Matcher for PostDetails component here</div>
  )
  return MockPostDetails
})

jest.mock("../features/posts/NewPostForm", () => {
  const MockNewPostForm = () => (
    <div>YOur Matcher for NewPostForm component here</div>
  )
  return MockNewPostForm
})

jest.mock("../features/posts/PostEditForm", () => {
  const MockPostEditForm = () => (
    <div>YOur Matcher for PostEditForm component here</div>
  )
  return MockPostEditForm
})

jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url"
}))

describe("AppRoutes component", () => {
  const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{ children }</MemoryRouter>
      )
    })
  }
  test("root path renders PostsList", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/"] })
    const expectedText = "YOur Matcher for PostsList component here"
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test("post details path renders PostDetails", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] })
    const expectedText = "YOur Matcher for PostDetails component here"
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test("/new path renders NewPostForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] })
    const expectedText = "YOur Matcher for NewPostForm component here"
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })

  test("/posts/:id/edit path renders PostEditForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1/edit"] })
    const expectedText = "YOur Matcher for PostEditForm component here"
    expect(screen.getByText(expectedText)).toBeInTheDocument()
  })
})