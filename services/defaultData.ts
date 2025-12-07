import { Formula } from '../types';

export const DEFAULT_FORMULAS: Formula[] = [
  // --- NHÓM KÍCH THÍCH & CHỮA LÀNH CƠ BẢN ---
  {
    id: 'kt-tbg',
    title: 'Kích Thích Tế Bào Gốc',
    subtitle: 'Dành cho người từ 8 - 39 tuổi (3:30s)',
    durationSeconds: 210, 
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA kích thích tế bào gốc sống khỏe mạnh đến 120 tuổi (đọc thầm 1 lần).',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cột sống đến tận xương cùng).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ đến tận xương cùng tạo được sự ấm áp cho toàn bộ cột sống cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'tu-chua-lanh',
    title: 'Tự Chữa Lành (Bản Thân)',
    subtitle: 'Bao gồm bệnh nan y & dịch bệnh',
    durationSeconds: 210,
    iconType: 'heart',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA chữa lành thân tâm bệnh cho người nhận (đọc thầm 1 lần).',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ người truyền).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ người truyền đi thẳng vào não bộ và toàn bộ cơ thể người nhận). Liên tục điều phối năng lượng từ Linh Quang Não Bộ đến toàn bộ cơ thể và những vùng bị đau bệnh cho đến khi chuông báo hết giờ.',
      'Bước 4: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  {
    id: 'chua-lanh-nguoi-khac',
    title: 'Chữa Lành Cho Người Khác',
    subtitle: 'Hỗ trợ chữa lành 1 người hoặc tập thể',
    durationSeconds: 210,
    iconType: 'users',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA hóa giải, thanh lọc độc tố...',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ của người truyền).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ của người truyền đi thẳng vào não bộ và toàn bộ cơ thể của người nhận/tập thể).',
      'Bước 4: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  
  // --- NHÓM ĐẶC BIỆT ---
  {
    id: 'dac-biet-3-trong-1',
    title: 'Công Thức Đặc Biệt 3 Trong 1 (Bản thân)',
    subtitle: 'Tự chữa lành - Hóa giải độc tố - Trái tim linh hồn',
    durationSeconds: 210,
    iconType: 'zap',
    steps: [
      'Bước 1: Hợp nhất năng lượng trái tim linh hồn vào LQNB và dọc theo tủy xương sống, xương tay, xương chân; toàn bộ hệ thống thần kinh và cơ bắp, nội tạng của mình. (1 lần)',
      'Bước 2: Bổ sung, điều chỉnh, phục hồi toàn bộ hệ thống chuyển hóa; quân bình đường huyết; hóa giải thanh lọc MIỄN NHIỄM độc tố; đưa tất cả tầng năng lượng ra khỏi thân xác tôi.',
      'Bước 3: Liên tục truyền tải năng lượng từ đỉnh đầu dọc theo tủy xương sống, xương tay, xương chân; toàn bộ hệ thống thần kinh và cơ bắp, nội tạng để tất cả tầng NL khác biệt tuần tự xuất ra theo đẳng cấp về khối sáng. (cho đến khi chuông báo hết giờ)',
      'Bước 4: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  {
    id: 'dac-biet-3-trong-1-tap-the',
    title: 'Công Thức Đặc Biệt 3 Trong 1 (Tập thể)',
    subtitle: 'Dành cho tập thể (Trực tiếp / Từ xa)',
    durationSeconds: 210,
    iconType: 'users',
    steps: [
      'Bước 1: Hợp nhất năng lượng trái tim linh hồn vào LQNB và dọc theo tủy xương sống, xương tay, xương chân; toàn bộ hệ thống thần kinh và cơ bắp, nội tạng của người truyền. (1 lần)',
      'Bước 2: Cùng một lúc Hợp nhất năng lượng trái tim linh hồn vào não bộ và dọc theo tủy xương sống... toàn bộ hệ thống thần kinh và cơ bắp, nội tạng của người truyền và tập thể người nhận. (1 lần)',
      'Bước 3: Bổ sung, điều chỉnh, phục hồi toàn bộ hệ thống chuyển hóa... Cùng một lúc liên tục truyền tải năng lượng cho cả người truyền và tập thể người nhận... (cho đến khi chuông báo hết giờ).',
      'Bước 4: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  {
    id: 'phuc-hoi-nang-luong',
    title: 'Phục Hồi & Bổ Sung Năng Lượng',
    subtitle: 'Cho tất cả đẳng cấp linh hồn',
    durationSeconds: 210,
    iconType: 'zap',
    steps: [
      'Bước 1: Hợp nhất năng lượng trái tim linh hồn vào LQNB. (1 lần)',
      'Bước 2: NVMNKG phục hồi năng lượng Trái tim linh hồn và bổ sung năng lượng Đạo đức Tình thương cho tất cả đẳng cấp linh hồn tình nguyện ở lại cùng NLG thực hiện văn minh kỷ cương...',
      'Bước 3: Cảm ơn tất cả đẳng cấp linh hồn tình nguyện ở lại cùng NLG thực hiện văn minh kỷ cương cho toàn thể nhân sinh và muôn loài vạn vật trên quả địa cầu.'
    ]
  },

  // --- NHÓM HÓA GIẢI & THANH LỌC ---
  {
    id: 'hoa-giai-doc-to-ban-than',
    title: 'Hóa Giải Độc Tố (Bản Thân)',
    subtitle: 'Thanh lọc độc tố, mỡ thừa, ổn định huyết áp',
    durationSeconds: 210,
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA hóa giải, thanh lọc độc tố, mùi hôi cơ thể và các chất độc hại, mỡ thừa, ổn định huyết áp và cân bằng lượng đường trong cơ thể.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng truyền tải từ đỉnh đầu đến bàn chân rồi đi ra ngoài cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'hoa-giai-da-cam',
    title: 'Hóa Giải Chất Độc Da Cam',
    subtitle: 'Cho bản thân',
    durationSeconds: 210,
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA hóa giải, thanh lọc chất độc da cam và các chất độc hại khác.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ đến toàn bộ cơ thể và những vùng bị đau bệnh cho đến khi chuông báo hết giờ.',
      'Bước 3 (Kết thúc): Cảm ơn tất cả linh hồn tình nguyện...'
    ]
  },
   {
    id: 'hoa-giai-gia-dinh',
    title: 'Hóa Giải Độc Tố (Hộ Gia Đình)',
    subtitle: 'Đất, nước, không khí bán kính 1 mile (1.6km)',
    durationSeconds: 210,
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số hóa giải các chất độc hại, chất phèn trong nguồn nước, các chất độc hại trên mặt đất và nằm sâu bên trong lòng đất.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ người truyền đi thẳng vào toàn bộ khu vực người truyền và bao phủ bán kính 1 mile). Liên tục hình dung cho đến khi chuông báo hết giờ.'
    ]
  },

  // --- NHÓM LÀM ĐẸP & HÌNH THỂ ---
  {
    id: 'lam-dep-da',
    title: 'Làm Đẹp Làn Da',
    subtitle: 'Xóa nếp nhăn, sẹo, mụn, nám, làm săn chắc da',
    durationSeconds: 210,
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA làm đẹp làn da... (đọc thầm)',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ lan tỏa đến toàn bộ làn da hoặc 3 vị trí da mình muốn cải thiện (tối đa 3 vị trí trong 1 lần thực hiện) cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'chinh-sua-khuon-mat',
    title: 'Chỉnh Sửa Khuôn Mặt',
    subtitle: 'Mắt, mũi, môi, khuôn mặt V-line',
    durationSeconds: 210,
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA chỉnh sửa khuôn mặt...',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ lan tỏa đến vị trí mình muốn cải thiện (tối đa 3 vị trí trong 1 lần thực hiện) cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'tang-chieu-cao',
    title: 'Tăng Chiều Cao',
    subtitle: 'Có thể thực hiện thêm lần 2 nếu cần',
    durationSeconds: 210,
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA tăng chiều cao... cm (điền số cm mong muốn).',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Hợp nhất vào vùng rốn 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ đi thẳng vào vùng rốn).',
      'Bước 4: Lấy rốn làm điểm giữa, liên tục điều phối năng lượng từ vùng rốn kéo dài cơ thể theo 2 chiều cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'lam-dep-toc',
    title: 'Làm Đẹp Tóc, Mi, Mày',
    subtitle: 'Kích thích mọc tóc, đen tóc',
    durationSeconds: 210,
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA mọc tóc, lông mi, lông mày...',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ lan tỏa đến mỗi vị trí chân tóc, lông mi, lông mày (tối đa 3 vị trí trong 1 lần thực hiện) cho đến khi chuông báo hết giờ.'
    ]
  },
   {
    id: 'vong-1-2-3',
    title: 'Chỉnh Sửa Vòng 1 - 2 - 3',
    subtitle: 'Tăng/Giảm kích thước các vòng',
    durationSeconds: 210,
    iconType: 'user',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA tăng / giảm vòng (1 / 2 / 3)...',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng lan tỏa từ Linh Quang Não Bộ đến từng vòng cần chỉnh sửa (tối đa 3 vị trí trong 1 lần thực hiện) cho đến khi chuông báo hết giờ.'
    ]
  },

  // --- NHÓM HỖ TRỢ BỆNH LÝ CỤ THỂ ---
  {
    id: 'benh-ngoai-da',
    title: 'Hỗ Trợ Bệnh Ngoài Da',
    subtitle: 'Vảy nến, ngứa, viêm da...',
    durationSeconds: 210,
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số hỗ trợ chữa lành tất cả những rối loạn bệnh tật về da.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ).',
      'Bước 3: Hình dung năng lượng từ Linh Quang Não Bộ đến toàn bộ cột sống lan tỏa ra toàn cơ thể. Hình dung đến những vùng da bị... cho đến khi chuông báo hết giờ.',
      'Bước 4: Cảm ơn tất cả linh hồn...'
    ]
  },
  {
    id: 'rang-mieng-tu-chua',
    title: 'Tự Chữa Lành Răng Miệng',
    subtitle: 'Viêm nướu, đau răng, sâu răng...',
    durationSeconds: 210, 
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA tự chữa lành bệnh về răng...',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục điều phối năng lượng từ Linh Quang Não Bộ đến vùng răng miệng cùng với ý tưởng trong bước 1 cho đến khi chuông báo hết giờ.',
      'Bước 3 (Kết thúc): Cảm ơn tất cả linh hồn...'
    ]
  },
  {
    id: 'rang-mieng-cho-nguoi-khac',
    title: 'Hỗ Trợ Chữa Lành Răng Miệng (1 Người)',
    subtitle: 'Trực tiếp hoặc Từ xa',
    durationSeconds: 210,
    iconType: 'shield',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA chữa lành bệnh về răng... cho người nhận phục hồi chắc khỏe.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ người truyền).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ người truyền đi thẳng vào não bộ và toàn bộ cột sống của người nhận). Liên tục điều phối NL đến vùng răng miệng người nhận cho đến khi chuông báo.',
      'Bước 3 (Kết thúc): Cảm ơn tất cả linh hồn...'
    ]
  },

  // --- NHÓM TRÁI TIM LINH HỒN ---
  {
    id: 'trai-tim-linh-hon-ban-than',
    title: 'Năng Lượng Trái Tim Linh Hồn (Bản Thân)',
    subtitle: 'Thực hiện 1p30s',
    durationSeconds: 90,
    iconType: 'heart',
    steps: [
      'Bước 1: Hợp nhất năng lượng trái tim linh hồn. (1 lần)',
      'Bước 2: Hình dung năng lượng trái tim linh hồn từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ cho đến khi chuông báo hết giờ.'
    ]
  },
  {
    id: 'trai-tim-linh-hon-tap-the',
    title: 'Truyền Năng Lượng Trái Tim Linh Hồn (Tập Thể)',
    subtitle: 'Không giới hạn số lượng người nhận',
    durationSeconds: 210,
    iconType: 'heart',
    steps: [
      'Bước 1: Hợp nhất năng lượng trái tim linh hồn (1 lần).',
      'Bước 2: Hình dung năng lượng trái tim linh hồn từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ người truyền rồi đến Não Bộ tập thể người nhận liên tục cho đến khi chuông báo hết giờ.'
    ]
  },

  // --- NHÓM ỨNG DỤNG KHÁC ---
  {
    id: 'kinh-doanh-dia-oc',
    title: 'Kinh Doanh & Địa Ốc',
    subtitle: 'Thuận mua vừa bán, công việc thuận lợi',
    durationSeconds: 210,
    iconType: 'zap',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số giúp kinh doanh thuận lợi.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ người truyền đi thẳng vào toàn bộ khu vực nhà đất, địa ốc, khu du lịch, dịch vụ...).',
      'Bước 4: Cầu nguyện thuận mua vừa bán, tạo được duyên lành cho 2 bên... lặp đi lặp lại mong muốn cho đến khi chuông báo chấm dứt.',
      'Bước 5: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  {
    id: 'kinh-doanh-dong-khach',
    title: 'Kinh Doanh Đông Khách',
    subtitle: 'Dành cho nhà hàng, quán ăn, dịch vụ',
    durationSeconds: 210,
    iconType: 'zap',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số đông khách đến với... (địa điểm kinh doanh).',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ).',
      'Bước 3: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Não Bộ của người truyền đi thẳng vào toàn bộ KHÁCH HÀNG TIỀM NĂNG).',
      'Bước 4: Hợp nhất năng lượng gửi đến các vị khách hàng tiềm năng, xin mời các vị khách hàng tiềm năng đến với... để sử dụng dịch vụ và sản phẩm... thuận mua vừa bán, khách hàng hài lòng.'
    ]
  },
  {
    id: 'cau-nguyen',
    title: 'Cầu Nguyện / Đại Ân Xá',
    subtitle: 'Cầu nguyện cho các đẳng cấp linh hồn',
    durationSeconds: 210,
    iconType: 'heart',
    steps: [
      'Bước 1: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ vào Linh Quang Não Bộ của chính mình). Hợp nhất 3 lần (Hình dung năng lượng từ LQNB của chính mình bao phủ toàn thế giới, cầu nguyện cho tất cả đẳng cấp linh hồn nương theo NLG trở về khối sáng).',
      'Bước 2: Nền VMNKG ban ĐẠI ÂN XÁ hóa giải thư yếm, bùa ngải, nghiệp lực, oan khuất; bổ sung NL để tất cả đẳng cấp linh hồn tiếp tục tiến hóa cao hơn... (Liên tục truyền tải NL từ LQNB đến tất cả đẳng cấp linh hồn cho đến khi chuông báo).',
      'Bước 3: Cảm ơn tất cả linh hồn tình nguyện ở lại thực hiện Đạo Đức và Tình Thương...'
    ]
  },
  {
    id: 'thu-vien-tam-linh',
    title: 'Thư Viện Tâm Linh',
    subtitle: 'Dành cho học viên muốn nghiên cứu',
    durationSeconds: 0, // Không giới hạn
    iconType: 'zap',
    steps: [
      'Bước 1: Thực hiện văn minh kỷ cương: NLG Linh Quang Não Bộ Băng Tần Lớp 5 Tần số nâng cấp tế bào năng lượng DNA để vào thư viện tâm linh.',
      'Bước 2: Hợp nhất 3 lần (Hình dung năng lượng từ Linh Quang Vũ Trụ đi thẳng vào Linh Quang Não Bộ và toàn bộ cơ thể).',
      'Bước 3: Liên tục tập trung tư tưởng đưa ra mong muốn để được sự hướng dẫn từ vị thiên sứ có trách nhiệm. Nội dung mong muốn cụ thể và liên quan đến nhu cầu chung.'
    ]
  }
];