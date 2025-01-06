import { useNavigate } from "react-router-dom"

export default function CardData({ title, desc, href = '', tags = [] }) {
  const navigator = useNavigate()
  return (
    <div className="flex flex-col gap-2 border rounded-xl p-4">
      <div className="font-normal text-lg pb-0">
        <a onClick={() => navigator(href)} className="hover:link hover:text-primary">
          {title}
        </a>
      </div>
      <div className="text-sm line-clamp-3">{desc}</div>
      <div className="flex gap-2 mt-2">
        {
          tags.map((tag, index) => (
            <div key={`tag-${index}`}>
              <div className="badge badge-outline rounded gap-1 items-center">
                {tag}
              </div>
            </div>
          ))
        }
        {/* <div className="badge badge-outline rounded gap-1 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-4 h-4">
            <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
          </svg>
          <p>Nectec</p>
        </div> */}
      </div>
    </div>
  )
}
