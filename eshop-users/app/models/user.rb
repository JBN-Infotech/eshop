class User < ApplicationRecord
  validates :username, presence: true
  validates :username, uniqueness: true

  validates :password, presence: true
  validates :password, uniqueness: true

  validates :email, presence: true
  validates :email, uniqueness: true

  def self.find_by_username_and_password(username, password)
    user = find_by(username: username)
  
    if user && user.password == password
      { status: :success, user_id: user.id }
    elsif user.nil?
      { status: :error, message: ['User not registered.'] }
    else
      { status: :error, message: ['Please enter correct password.'] }
    end
  end
end
