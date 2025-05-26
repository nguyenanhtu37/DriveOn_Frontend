import { useQuery } from '@tanstack/react-query';
import { fetchProGarages } from '@/app/services/garage';
import Loader from '@/components/Emergency/Loader';

const GaragePro = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['pro-garages'],
    queryFn: fetchProGarages,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-[#FF6B00] text-white rounded-lg shadow hover:bg-[#E65C00] transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  const proGarages = Array.isArray(data) ? data.filter(garage => garage.tag === 'pro') : [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#FF6B00] via-[#FF8533] to-[#FF9D4D] text-white">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Nâng Cấp Lên Garage Pro
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Tận hưởng các tính năng ưu việt và tăng cường hiệu quả kinh doanh
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/garageProUpgrade'}
                className="px-8 py-4 bg-white text-[#FF6B00] rounded-lg text-lg font-semibold hover:bg-orange-50 transition shadow-lg"
              >
                Nâng Cấp Ngay
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition">
                Tìm Hiểu Thêm
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Hiển Thị Ưu Tiên</h3>
              <p className="text-gray-600">Garage của bạn sẽ được hiển thị đầu tiên trong kết quả tìm kiếm, tăng khả năng tiếp cận khách hàng</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Thống Kê Chi Tiết</h3>
              <p className="text-gray-600">Báo cáo doanh thu, đánh giá và phân tích khách hàng giúp bạn đưa ra quyết định kinh doanh tốt hơn</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-[#FF6B00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Quản Lý Đặt Lịch</h3>
              <p className="text-gray-600">Công cụ quản lý lịch hẹn và nhân viên hiệu quả, giúp tối ưu hóa quy trình làm việc</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pro Garages Showcase */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Đối Tác Garage Pro</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {proGarages.map((garage) => (
              <div key={garage._id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={garage.interiorImages?.[0] || '/placeholder-garage.jpg'}
                    alt={garage.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{garage.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{garage.address}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-[#FF6B00]">★</span>
                    <span className="ml-1 text-sm text-gray-600">{garage.ratingAverage?.toFixed(1) || '0.0'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Chọn Gói Nâng Cấp Phù Hợp</h2>
            <p className="text-xl text-gray-600">Đầu tư cho sự phát triển của garage của bạn</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold mb-4">Gói Cơ Bản</h3>
              <div className="text-3xl font-bold mb-6">500.000đ<span className="text-lg text-gray-500">/tháng</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Hiển thị ưu tiên trong tìm kiếm
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Thống kê cơ bản
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Quản lý lịch hẹn
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-semibold hover:bg-[#E65C00] transition">
                Chọn Gói Này
              </button>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition border-2 border-[#FF6B00]">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#FF6B00] text-white px-4 py-1 rounded-full text-sm font-semibold">
                Phổ Biến
              </div>
              <h3 className="text-2xl font-semibold mb-4">Gói Nâng Cao</h3>
              <div className="text-3xl font-bold mb-6">1.000.000đ<span className="text-lg text-gray-500">/tháng</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Tất cả tính năng gói cơ bản
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Thống kê chi tiết
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Quản lý nhân viên
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-[#FF6B00] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Hỗ trợ 24/7
                </li>
              </ul>
              <button className="w-full px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-semibold hover:bg-[#E65C00] transition">
                Chọn Gói Này
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Sẵn Sàng Nâng Cấp?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tham gia cùng các garage hàng đầu và tận hưởng những lợi ích đặc biệt của Garage Pro
          </p>
          <button
            onClick={() => window.location.href = '/garageProUpgrade'}
            className="px-8 py-4 bg-white text-[#FF6B00] rounded-lg text-lg font-semibold hover:bg-orange-50 transition shadow-lg"
          >
            Nâng Cấp Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default GaragePro; 